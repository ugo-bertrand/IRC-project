const messagePrivateModel = require("../models/message_private.model.js");

exports.createMessagePrivate = (req, result) => {
    if (Object.keys(req.body).length === 0) {
        result.status(400).send({
            message: "Le contenu ne doit pas être vide.",
            code: 400
        });
    }
    try {
        const messagePrivate = {
            ...req.body,
            date: new Date()
        }
        const data = new messagePrivateModel({
            ...messagePrivate
        });
        data.save();
        result.status(200).send({
            message: "Le message a bien été envoyer.",
            code: 200
        });
        console.log("Le message a bien été envoyer.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie du message.",
            code: 500
        });
        console.log("Une erreur est survenue lors de l'envoie du message.");
        console.log(error);
    }
}

exports.findAllMessagePrivate = async (req, result) => {
    try {
        const data = await messagePrivateModel.find();
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie des données.",
            code: 500
        });
        console.log("Une erreur est survenue lors de l'envoie des données.");
        console.log(error);
    }
}

exports.findMessagePrivateById = async (req, result) => {
    try {
        const id = req.params.id;
        const data = await messagePrivateModel.findById(id);
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch (error) {
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données.");
        console.log(error);
    }
}

exports.updateMessagePrivateById = async (req, result) => {
    if(Object.keys(req.body).length === 0){
        result.status(400).send({
            message:"Le contenu ne doit pas être vide.",
            code:400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try{
        const id = req.params.id;
        const updateMessage = {
            ...req.body,
            date: new Date()
        }
        const options = {new:true};
        const data = await messagePrivateModel.updateOne({_id:id},updateMessage,options);
        if(data.matchedCount === 0 ){
            result.status(404).send({
                message:"Le message avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le message avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le message avec l'ID : " + id + " a bien été modifier.",
            code:200
        });
        console.log("Le message avec l'ID : " + id + " a bien été modifier.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la modification du message.",
            code:500
        });
        console.log("Une erreur est survenue lors de la modification du message.");
        console.log(error);
    }
}

exports.deleteMessagePrivateById = async (req, result) => {
    try{
        const id = req.params.id;
        const data = await messagePrivateModel.deleteOne({_id:id});
        if(data.deletedCount === 0){
            result.status(404).send({
                message:"Le message avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le message avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le message avec l'ID : " + id + " a bien été supprimer.",
            code:200
        });
        console.log("Le message avec l'ID : " + id + " a bien été supprimer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la suppression du message.",
            code:500
        });
        console.log("Une erreur est survenue lors de la suppression du message.");
        consolz.log(error);
    }
}