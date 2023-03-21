import livros from "../models/Livro.js";

class livroController{
    static listarLivros = async (req, res) => {
        res.status(200).json(await livros.find().populate("autor"));
    }

    static listarLivroPorId = async (req, res) => {
        const id = req.params.id;
        try{
            res.status(200).send(await livros.findById(id).populate("autor", "nome"));
        }
        catch(err){
            res.status(400).send({message : `${err.message} - Id do livro não localizada`});
        }
    }

    static listarLivroPorEditora = async (req, res) => {
        const editora = req.query.editora;
        try{
            res.status(200).send(await livros.find({'editora': editora}).populate("autor", "nome"));
        }
        catch(err){
            res.status(400).send({message : `${err.message} - editora do livro não localizada`});
        }
    }

    static cadastrarLivro = async (req, res) => {
        let livro = new livros(req.body);
        try{
            await livro.save()
            res.status(201).send(livro.toJSON());
        }
        catch(err){
            res.status(500).send({message : `${err.message} - falha ao cadastrar livro`});
        }
    }

    static atualizarLivro = async (req, res) => {
        const id = req.params.id;
        try{
            await livros.findByIdAndUpdate(id, {$set : req.body});
            res.status(200).send({message : "Livro atualizado com sucesso"})
        }
        catch(err){
            res.status(500).send({message: err.message});
        }
    }

    static excluirLivro = async (req, res) => {
        const id = req.params.id;
        try{
            await livros.findByIdAndDelete(id);
            res.status(200).send({message : "Livro removido com sucesso"});
        }
        catch(err){
            res.status(500).send({message : err.message});
        }
    }

}

export default livroController;