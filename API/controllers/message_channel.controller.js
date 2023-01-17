const messageChannelModel = require("../models/message_channel.model.js");

exports.createMessageChannel = (req, result) => {
    if (Object.keys(req.body).length === 0) {
        result.status(400).send({
            message: "Le contenu ne doit pas être vide.",
            code: 400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try {
        const messageChannel = {
            ...req.body,
            date: new Date()
        }
        const data = new messageChannelModel({
            ...messageChannel
        });
        data.save();
        result.status(200).send({
            message: "Le message a bien été envoyer dans le channel.",
            code: 200
        });
        console.log("Le message a bien été envoyer dans le channel.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie du message dans le channel.",
            code: 500
        });
        console.log("Une erreur est survenue lors de l'envoie du message dans le channel.");
        console.log(error);
    }
}

exports.findAllMessageChannel = async (req, result) => {
    try {
        const data = await messageChannelModel.find();
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

exports.findMessageChannelById = async (req, result) => {
    try {
        const id = req.params.id;
        const data = await messageChannelModel.findById(id);
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de l'envoie des données."
        });
        console.log("Une erreur est survenue lors de l'envoie des données.");
        console.log(error);
    }
}

exports.findMessageChannelByChannel = async (req, result) => {
    try {
        const channelId = req.params.channelId;
        const data = await messageChannelModel.findOne({ channel_id: channelId });
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


exports.updateMessageChannelById = async (req, result) => {
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
        const data = await messageChannelModel.updateOne({ _id: id });
        if (data.matchedCount === 0) {
            result.status(404).send({
                message: "Le message avec l'ID : " + id + " n'existe pas.",
                code: 404
            });
            console.log("Le message avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message: "Le message avec l'ID : " + id + " a bien été modifier.",
            code: 200
        });
        console.log("Le message avec l'ID : " + id + " a bien été modifier.");
    }
    catch (error) {
        result.status(500).send({
            message: "Une erreur est survenue lors de la modification du message.",
            code: 500
        });
        console.log("Une erreur est survenue lors de la modification du message.");
        console.log(error);
    }
}

exports.deleteMessageChannelById = async (req, result) => {
    try {
        const id = req.params.id;
        const data = await messageChannelModel.deleteOne({_id:id});
        if(data.deletedCount === 0){
            result.status(404).send({
                message:"Le message avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le messsage avec l'ID : " + id + " n'existe pas.");
        }
        result.status(200).send({
            message:"Le message avec l'ID : " + id + " a bien été modifier.",
            code:200
        });
        console.log("Le message avec l'ID : " + id + " a bien été modifier.");
    }
    catch (error) {
        result.status(500).send({
            message:"Une erreur est survenue lors de la suppression du message.",
            code:500
        });
        console.log("Une erreur est survenue lors de la suppression du message.");
        console.log(error);
    }
}