import { Request, Response } from "express";
import RuralProducer from "../models/ruralProducerModel";

export const create = async (req: Request, res: Response) => {
  try {
    const ruralProducer = await RuralProducer.create(req.body);
    res.status(201).json(ruralProducer);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar produtor rural", error });
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    const ruralProducers = await RuralProducer.findAll();
    res.status(200).json(ruralProducers);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao buscar produtores rurais", error });
  }
};

export const readById = async (req: Request, res: Response) => {
  try {
    const ruralProducer = await RuralProducer.findByPk(req.params.id);
    res.status(200).json(ruralProducer);
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar produtor rural", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await RuralProducer.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: "Produtor rural atualizado com sucesso!" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar produtor rural", error });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    await RuralProducer.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Produtor rural deletado com sucesso." });
  } catch (error) {
    res.status(400).json({ message: "Erro ao deletar produtor rural", error });
  }
};
