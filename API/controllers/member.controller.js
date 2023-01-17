const memberModel = require("../models/member.model.js");

exports.createMember = (req,result) => {
    if(Object.keys(req.body).length === 0){
        result.status(400).send({
            message:"Le contenu ne doit pas être vide.",
            code:400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try{
        const memberData = new memberModel({
            ...req.body
        });
        memberData.save();
        result.status(200).send({
            message:"Le membre du channel a bien été ajouter.",
            code:200
        });
        console.log("Le membre du channel a bien été ajouter.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'ajout d'un membre dans le channel.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'ajout d'un membre dans le channel.");
        console.log(error);
    }
}

exports.findAllMember = async (req,result) => {
    try{
        const data = await memberModel.find();
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données des membres.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données des membres.");
    }
}

exports.findMemberById = async (req,result) => {
    try{
        const id = req.params.id;
        const data = await memberModel.find(id);
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données du membre.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données du membre.");
    }
}

exports.findMembersOfChannel = async (req,result) =>{
    try{
        const channelId = req.params.channelId;
        const data = await memberModel.find({channel_id:channelId});
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de l'envoie des données."
        });
        console.log("Une erreur est survenue lors de l'envoie des données.");
    }
}

exports.findChannelOfMember = async (req,result) => {
    try{
        const userId = req.params.userId;
        const data = await memberModel.find({user_id: userId});
        result.status(200).send(data);
        console.log("Les données ont bien été envoyer.");
    }
    catch(error){
        result.status(500).send({
            messsage:"Une erreur est survenue lors de l'envoie des données.",
            code:500
        });
        console.log("Une erreur est survenue lors de l'envoie des données.");
    }
}

exports.updateMemberById = async (req,result) => {
    if(Object.keys(req.body).length === 0){
        result.status(400).send({
            message:"Le contenu ne doit pas être vide.",
            code:400
        });
        console.log("Le contenu ne doit pas être vide.");
        return;
    }
    try{
        const id = req.body;
        const updateMember = {
            ...req.body
        };
        const options = {new:true};
        const data = await memberModel.updateOne({_id:id});
        if(data.matchedCount === 0){
            result.status(404).send({
                message:"Le membre avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le membre avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le membre avec l'ID : " + id + " a bien été modifier.",
            code:200
        });
        console.log("Le membre avec l'ID : " + id + " a bien été modifier.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la modification du membre",
            code:500
        });
        console.log("Une erreur est survenue lors de la modification du membre.");
    }
}

exports.deleteMemberById = async (req,result) => {
    try{
        const id = req.params.id;
        const data = await memberModel.deleteOne({_id:id});
        if(data.deletedCount === 0){
            result.status(404).send({
                message:"Le member avec l'ID : " + id + " n'existe pas.",
                code:404
            });
            console.log("Le membre avec l'ID : " + id + " n'existe pas.");
            return;
        }
        result.status(200).send({
            message:"Le membre avec l'ID : " + id + " a bien été supprimer.",
            code:200
        });
        console.log("Le membre avec l'ID : " + id + " a bien été supprimer.");
    }
    catch(error){
        result.status(500).send({
            message:"Une erreur est survenue lors de la suppression du membre.",
            code:500
        });
        console.log("Une erreur est survenue lors de la suppression du membre.");
    }
}