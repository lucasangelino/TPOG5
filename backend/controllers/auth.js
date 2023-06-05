var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { response } = require("express");
const bcrypt = require("bcrypt");
const otpGenerator = require('otp-generator')
const { generateJWT, verifyJWT } = require("../helpers/jwt");
const UserRepository = require("../db/repository/UserRepository");

var constants = require("../common/constants");

const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_API_KEY,
    process.env.GMAIL_API_SECRET,
    process.env.GMAIL_API_REDIRECT_URI
);

oAuth2Client.setCredentials({
    refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
});

const signup = async(req, res = response) => {
    try {

        const { nickname, mail, nombre, password, repeatPassword, tipo_usuario } = req.body;
        if (!['Visitante', 'Alumno'].includes(tipo_usuario)) {
            return res
                .status(400)
                .json({ err: `'${tipo_usuario} no es un tipo de usuario valido'` });
        }

        if (password !== repeatPassword) {
            return res
                .status(400)
                .json({ err: "Las contrasenas no coinciden" });
        }

        // buscamos por mail
        let user = await UserRepository.getUserByMail(mail);
        if (user != null) {
            return res.status(400).json({
                ok: false,
                message: "User already exist",
            });
        }

        // buscamos por alias ahora
        user = await UserRepository.getUserByNickname(nickname);
        if (user != null) {
            return res.status(400).json({
                ok: false,
                message: "User already exist",
            });
        }

        let hash = await bcrypt.hash(password, constants.SALT_ROUNDS);
        user = await UserRepository.signup(nickname, mail, nombre, hash, tipo_usuario);

        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                ...constants.auth,
                accessToken: accessToken,
            },
        });

        // TODO axel: hacer que sea un token de un solo uso -- cargar en la db, agregar marca de registro completo, volar de la db.
        const token = await generateJWT({ idusuario: user.idusuario });

        const mailOptions = {
            ...constants.mailoptions,
            from: "recetas",
            to: req.body.mail,
            text: `Hola! Te escribimos de Recetas. \n
        has registrado una cuenta con este mail, si no fuiste tu, ignoralo. \n
        Sigue este link: http://localhost:8080/signup/complete?token=` + token,
        };

        try {
            const result = await transport.sendMail(mailOptions);

            if (result.accepted.length > 0) {
                return res.status(200).json({ "result": "ok", "message": "Revisa tu correo para completar el registro" });
            }

            return res.status(500).json({ "result": "error", "message": result.response });
        } catch (error) {
            console.log(error);
            return json.send(error);
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Unexpected error",
        });
    }
};

const completeSignUp = async(req, res = response) => {
    try {

        const token = req.query.token;

        let decoded = await verifyJWT(token);
        if (decoded.err) {
            return res
                .status(401)
                .json({ err: "error decrypt token" });
        }


        UserRepository.getUserByidusuario(decoded.idusuario).then(async(user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ err: "no existe el usuario" });

            }

            let bret = await UserRepository.completeUserSignUp(decoded.idusuario);
            if (!bret) {
                return res.status(500).json({
                    ok: false,
                    message: "Unexpected error completing sign up",
                });
            }


            const token = await generateJWT({ "idusuario": decoded.idusuario });

            return res.json({ ok: true, token: token });
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Unexpected error",
        });
    }
};


const login = async(req, res = response) => {
    const { mail, password } = req.body;

    try {

        const usuario = await UserRepository.getUserByMail(mail);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: "User or password incorrect",
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.getPassword());
        if (!validPassword || !usuario.getHabilitado()) {
            return res.status(400).json({
                ok: false,
                message: "User or password incorrect",
            });
        }

        // Generate JWT
        const token = await generateJWT(usuario.idusuario);
        return res.json({
            ok: true,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Unexpected error",
        });
    }
};

const renew = async(req, res = response) => {
    const { uid } = req;

    const token = await generateJWT(uid);

    return res.json({
        ok: true,
        token,
    });
};

const sendOTP = async(req, res) => {
    try {
        let foundUser = await UserRepository.getUserByMail(req.body.email);
        if (foundUser) {
            let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, digits: true, lowerCaseAlphabets: false });

            console.log('Data from User', foundUser);
            await UserRepository.genOTP(foundUser.uid, otp)
                //new code
            const mailOptions = {
                ...constants.mailoptions,
                from: "recetas",
                to: req.body.mail,
                text: `Hola! Te escribimos de Recetas. \n
          Por favor, ingrese este código para recumerar tu contraseña: ` + otp,
            };

            try {
                const result = await transport.sendMail(mailOptions);

                if (result.accepted.length > 0) {
                    return res.status(200).json({ "result": "ok", "message": "Revisa tu correo para completar el registro" });
                }

                return res.status(500).json({ "result": "error", "message": result.response });
            } catch (error) {
                console.log(error);
                return json.send(error);
            }
            // end new code
            res.send({ sended: true, message: 'Se ha enviado correctamente' });
        } else {
            res.send({ sended: false, statusCode: 500, message: 'Revise el email ' });
        }
    } catch {
        res.send("Internal server error");
    }
}

const validateOTP = async(req, res) => {
    try {
        let foundUser = await UserRepository.getUserByMail(req.body.email);
        console.log(foundUser)
        if (foundUser) {
            if (foundUser.otp == req.body.otp) {
                res.send({ reset: true, statusCode: 200, message: 'Codigo validado exitosamente' });
            } else {
                res.send({ statusCode: 500, message: 'No se ha podido validar su codigo' });
            }
        }
    } catch {
        res.send("Internal server error");
    }
}

const resetPassword = async(req, res) => {
    try {
        let foundUser = await UserRepository.getUserByMail(req.body.email);
        console.log(foundUser)
        if (foundUser) {
            let hashPassword = await bcrypt.hash(req.body.password, 10);
            await UserRepository.updatePassword(foundUser.uid, hashPassword);
            res.send({ reset: true, message: 'El cambio se ha realizado exitosamente' });
        }
    } catch {
        res.send("Internal server error");
    }
}

module.exports = {
    signup,
    completeSignUp,
    login,
    renew,
    sendOTP,
    validateOTP,
    resetPassword,
};