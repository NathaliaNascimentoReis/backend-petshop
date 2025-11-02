import { Router } from "express";
import * as petsControllers from "./../controllers/petsControllers.js";

const router = Router();

router.get("/", petsControllers.listarTodosPets);
router.get("/:id", petsControllers.listarPetsById);
router.post("/", petsControllers.criarPet);
router.put("/:id", petsControllers.atualizarPet);
router.delete("/:id", petsControllers.deletarPetsById);

export default router;
