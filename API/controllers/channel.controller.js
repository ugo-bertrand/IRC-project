const channelModel = require("../models/channel.model.js");

exports.createChannel = (req,result) => {
    if(Object.keys(req.body).length === 0){
        result.status(400).send({
            message:"Le contenu ne doit pas être vide.",
            code:400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try{
        const channelData = new channelModel({
            name: req.body.name,
            description: req.body.description
        });
        channelData.save();
        result.status(200).send({
            message:"Le channel avec le nom " + req.body.name + " a bien été créer.",
            code:200
        });
        console.log("Le channel avec le nom " + req.body.name + " a bien été créer.");
    }

    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la création du channel.",
            code:500
        });
        console.log("Une erreur est survenue lors de la création du channel.");
        console.log(error);
    }
}

exports.findAllChannel = async (req,result) => {
    try{
        const data = await channelModel.find();
        result.status(200).send(data);
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données des channels",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données des channels");
        console.log(error);
    }
}

exports.findChannelById = async (req,result) => {
    try{
        const data = await channelModel.findById(req.params.id);
        result.status(200).send({
            data: data
        });
        console.log("Les données du channel avec l'ID :" + req.params.id + "ont été envoyer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données du channel.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données du channel.");
        console.log(error);
    }
}

exports.updateChannelById = async (req,result) => {
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
        const updateChannel = {
            ...req.body
        };
        const options = { new: true };
        const data = await channelModel.updateOne({ _id: req.params.id},updateChannel,options);
        if(data.matchedCount === 0){
            result.status(404).send({
                message:"Le channel avec l'ID : " + req.params.id + " n'existe pas.",
                code:404
            });
            console.log("Le channel avec l'ID : " + req.params.id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le channel avec l'ID : " + req.params.id + " a bien été modifier.",
            code:200
        });
        console.log("Le channel avec l'ID : " + req.params.id + " a bien été modifier.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la modification du channel.",
            code:500
        });
        console.log("Une erreur est survenue lors de la modification du channel.");
        consolr.log(error);
    }
}

exports.deleteChannelById = async (req,result) => {
    try{
        const id = req.params.id;
        const data = await channelModel.deleteOne({_id: id});
        if(data.deletedCount === 0){
            result.status(404).send({
                messsage:"Le channel avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le channel avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le channel avec l'ID : " + id + " a bien été supprimer.",
            code:200
        });
        console.log("Le channel avec l'ID :" + id + " a bien été supprimer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la suppression du channel.",
            code:500
        });
        console.log("Une erreur est survenue lors de la suppression du channel.");
        console.log(error);
    }
}