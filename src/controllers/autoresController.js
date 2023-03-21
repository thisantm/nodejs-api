import autores from "../models/Autor.js";

class autoresController{
    static listarAutores = async (req, res) => {
        res.status(200).json(await autores.find({}));
    }

    static listarAutorPorId = async (req, res) => {
        const id = req.params.id;
        try{
            res.status(200).send(await autores.findById(id));
        }
        catch(err){
            res.status(400).send({message : `${err.message} - Id do autor não localizada`});
        }
    }

    static cadastrarAutor = async (req, res) => {
        let autor = new autores(req.body);
        try{
            await autor.save()
            res.status(201).send(autor.toJSON());
        }
        catch(err){
            res.status(500).send({message : `${err.message} - falha ao cadastrar autor`});
        }
    }

    static atualizarAutor = async (req, res) => {
        const id = req.params.id;
        try{
            await autores.findByIdAndUpdate(id, {$set : req.body});
            res.status(200).send({message : "autor atualizado com sucesso"})
        }
        catch(err){
            res.status(500).send({message: err.message});
        }
    }

    static excluirAutor = async (req, res) => {
        const id = req.params.id;
        try{
            await autores.findByIdAndDelete(id);
            res.status(200).send({message : "autor removido com sucesso"});
        }
        catch(err){
            res.status(500).send({message : err.message});
        }
    }

}

export default autoresController;