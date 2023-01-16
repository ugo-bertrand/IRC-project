const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createUser = (req, result) => {
    if (Object.keys(req.body).length === 0) {
        result.status(400).send({
            message: "Le contenu ne doit pas être vide.",
            code: 400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }

    try {
        var clearPassword = req.body.password;
        const salt = bcrypt.genSaltSync(15);
        const hashPassword = bcrypt.hashSync(clearPassword, salt);

        const userData = new userModel({
            name: req.body.name,
            firstname: req.body.firstname,
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });

        const dataToSave = userData.save();
        result.status(200).send({
            message: "L'utilisateur " + req.body.username + " a bien été créer.",
            data: dataToSave
        });
        console.log("L'utilisateur " + req.body.username + " a bien été créer.");

    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de la création de l'utilisateur.",
            code: 500
        });
        console.log("Une erreur est survenue lors de l'envoie de la création de l'utilisateur.");
        console.log(error);
    }
};

exports.findAllUser = async (req, result) => {
    try {
        const data = await userModel.find();
        result.status(200).send(data);
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie des données des utilisateurs.",
            code: 500
        });
        console.log(error);
    }
};

exports.findUserById = async (req, result) => {
    try {
        const data = await userModel.findById(req.params.id);
        result.status(200).send(data);
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie des données de l'utilisateur avec l'ID :" + req.params.id + ".",
            code: 500
        });
        console.log("Une erreur est survenue lors de l'envoie des données de l'utilisateur avec l'ID :" + req.params.id + ".");
        console.log(error);
    }
};

exports.updateUserById = async (req, result) => {
    if (Object.keys(req.body).length === 0) {
        result.status(400).send({
            message: "Le contenu ne doit pas être vide.",
            code: 400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try {
        const id = req.params.id;
        const udpateUser = req.body;
        const options = { new: true };

        await userModel.findByIdAndUpdate(id, udpateUser, options);
        result.status(200).send({
            message: "L'utilisateur a bien été modifier."
        });
        console.log("L'utilisateur a bien été modifier.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de la modification de l'utilisateur.",
            code: 500
        });
        console.log("Une erreur est survenue lors de la modification de l'utilisateur.");
        console.log(error);
    }
};

exports.deleteUserById = async (req, result) => {
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);
        result.status(200).send({
            message: "L'utilisateur a avec l'ID : " + req.params.id + " a bien été supprimer."
        });
        console.log("L'utilisateur a avec l'ID : " + req.params.id + " a bien été supprimer.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de la suppression de l'utilisateur avec l'ID : " + req.params.id + " .",
            code: 500
        });
        console.log("Une erreur est survenue lors de la suppression de l'utilisateur avec l'ID : " + req.params.id + " .");
        console.log(error);
    }
};

exports.login = async (req, result) => {
    try {
        const data = await userModel.findOne({ username: req.body.username });
        console.dir(data);
        const passwordIsOk = bcrypt.compareSync(req.body.password, data.password);
        if (passwordIsOk) {
            const userToken = {
                id: data._id,
                email: data.email,
                username: data.username
            };
            const token = jwt.sign({ user }, process.env.SECRET_KEY, {
                expiresIn: "24h"
            });
            result.cookie("jwt", token);
            result.status(200).send({
                user_token: token,
                message: "La connexion de l'utilisateur est un succès."
            });
            console.log("Le connexion de l'utilisateur est un succès.");
        }
        else {
            result.status(400).send({
                message: "Le mot de passe et le nom d'utilisateur ne correspondent pas.",
                code: 400
            });
            console.log("Le mot de passe et le nom d'utilisateyr ne correspondent pas.");
            return;
        }
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de la connexion de l'utilisateur.",
            code: 500
        });
        console.log("Une erreur est survenue lors de la connexion de l'utilisateur.");
        console.log(error);
    }
};

exports.logout = async (req, result) => {
    try{
        result.clearCookie("jwt");
        result.status(200).send({
            message:"La déconnexion de l'utilisateur est un succès."
        });
        console.log("La déconnexion de l'utilisateur est un succès.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la déconnexion de l'utilisateur."
        });
    }
};