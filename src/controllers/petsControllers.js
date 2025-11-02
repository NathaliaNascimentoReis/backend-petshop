import * as petsModels from "./../models/petsModels.js";

export const listarTodosPets = async (req, res) => {
  try {
    const pets = await petsModels.getAllPets();
    if (!pets || pets.length === 0) {
      res.status(404).json({
        status: 404,
        total: pets.length,
        message: "Nenhum pet cadastrado.",
      });
    }

    res.status(200).json({
      status: 200,
      total: pets.length,
      pets: pets,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      erro: "Erro interno do servidor.",
      details: error.message,
    });
  }
};

export const listarPetsById = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await petsModels.getPetsById(id);

    if (!pet) {
      return res.status(404).json({
        status: 404,
        erro: "Nenhum pet encontrado com esse ID.",
        message: "Verifique o ID e tente novamente.",
        id: id,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Pet encontrado com sucesso!",
      pet: pet,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      erro: "Erro interno do servidor.",
      details: error.message,
    });
  }
};

export const criarPet = async (req, res) => {
  try {
    const { nome, especie, idade, dono } = req.body;
    const data = req.body;

    const camposObrigatorios = ["nome", "especie"];
    const faltando = camposObrigatorios.filter((campo) => !data[campo]);

    if (faltando.length > 0) {
      return res.status(400).json({
        erro: `Os seguintes campos são obrigatórios: ${faltando.join(", ")}`,
      });
    }

    const novoPet = await petsModels.createPet(req.body);
    res.status(201).json({
      message: "Pet criado com sucesso!",
      pet: novoPet,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      erro: "Erro interno do servidor.",
      details: error.message,
    });
  }
};

export const atualizarPet = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;

    const petExiste = await petsModels.getPetsById(id);

    if (!petExiste) {
      return res.status(404).json({
        status: 404,
        erro: "Nenhum pet encontrado com esse ID.",
        id: id,
      });
    }

    const petAtualizado = await petsModels.updatePet(id, data);

    return res.status(200).json({
      status: 200,
      message: "Pet atualizado com sucesso!",
      petAtualizado: petAtualizado,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      erro: "Erro interno do servidor.",
      details: error.message,
    });
  }
};

export const deletarPetsById = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await petsModels.getPetsById(id);

    if (!pet) {
      return res.status(404).json({
        status: 404,
        erro: "Nenhum pet encontrado com esse ID.",
        message: "Verifique o ID e tente novamente.",
        id: id,
      });
    }

    await petsModels.deletePet(id);

    return res.status(200).json({
      status: 200,
      message: "Pet deletado com sucesso!",
      petDeletado: pet,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      erro: "Erro interno do servidor.",
      details: error.message,
    });
  }
};
