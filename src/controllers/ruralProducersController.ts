import { Request, Response } from "express";
import RuralProducer from "../models/ruralProducerModel";
import { determineTaxIdType, validateArea } from "../helper/validations";
import { cpf, cnpj } from "cpf-cnpj-validator";

export const create = async (req: Request, res: Response) => {
  try {
    const { arableArea, vegetationArea, totalArea, taxId } = req.body;
    validateArea(arableArea, vegetationArea, totalArea);
    if (!validateArea(arableArea, vegetationArea, totalArea)) {
      return res.status(400).json({
        error:
          "A soma da área agricultável e vegetação não pode ser maior do que a área total da fazenda.",
      });
    }

    if (!(cpf.isValid(taxId) || cnpj.isValid(taxId))) {
      return res.status(400).json({ error: "CPF ou CNPJ inválido." });
    }

    const unformattedTaxId = taxId.replace(/[^\d]/g, "");
    const taxIdType = determineTaxIdType(unformattedTaxId);
    req.body.taxId = unformattedTaxId;
    req.body.taxIdType = taxIdType;

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
    const producer = await RuralProducer.findOne({
      where: { id: req.params.id },
    });
    if (!producer) {
      return res.status(404).json({ error: "Produtor rural não encontrado." });
    }

    const ruralProducer = await RuralProducer.findByPk(req.params.id);
    res.status(200).json(ruralProducer);
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar produtor rural", error });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { arableArea, vegetationArea, totalArea, taxId } = req.body;
    validateArea(arableArea, vegetationArea, totalArea);
    if (!validateArea(arableArea, vegetationArea, totalArea)) {
      return res.status(400).json({
        error:
          "A soma da área agricultável e vegetação não pode ser maior do que a área total da fazenda.",
      });
    }

    if (!(cpf.isValid(taxId) || cnpj.isValid(taxId))) {
      return res.status(400).json({ error: "CPF ou CNPJ inválido." });
    }

    const producer = await RuralProducer.findOne({
      where: { id: req.params.id },
    });
    if (!producer) {
      return res.status(404).json({ error: "Produtor rural não encontrado." });
    }

    const unformattedTaxId = taxId.replace(/[^\d]/g, "");
    const taxIdType = determineTaxIdType(unformattedTaxId);
    req.body.taxId = unformattedTaxId;
    req.body.taxIdType = taxIdType;

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
    const producer = await RuralProducer.findOne({
      where: { id: req.params.id },
    });
    if (!producer) {
      return res.status(404).json({ error: "Produtor rural não encontrado." });
    }

    await RuralProducer.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Produtor rural deletado com sucesso." });
  } catch (error) {
    res.status(400).json({ message: "Erro ao deletar produtor", error });
  }
};
