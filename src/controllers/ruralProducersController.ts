import { Request, Response } from "express";
import RuralProducer from "../models/ruralProducerModel";
import { determineTaxIdType, validateArea } from "../helper/validations";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { AllowedCrops, CropAttributes } from "../interface/crops";
import Crop from "../models/cropModel";

export const create = async (req: Request, res: Response) => {
  try {
    const { arableArea, vegetationArea, totalArea, taxId, crops } = req.body;
    const isValidArea = validateArea(arableArea, vegetationArea, totalArea);
    if (!isValidArea) {
      return res.status(400).json({
        error:
          "A soma da área agricultável e vegetação não pode ser maior do que a área total da fazenda.",
      });
    }

    if (!(cpf.isValid(taxId) || cnpj.isValid(taxId))) {
      return res.status(400).json({ error: "CPF ou CNPJ inválido." });
    }

    const unformattedTaxId = taxId.replace(/[^\d]/g, "");

    const existingProducer = await RuralProducer.findOne({ where: { taxId: unformattedTaxId } });

    if (existingProducer) {
      return res.status(400).json({ error: "Este produtor já existe." });
    }

    const taxIdType = determineTaxIdType(unformattedTaxId);
    req.body.taxId = unformattedTaxId;
    req.body.taxIdType = taxIdType;

    // Create the rural producer
    const ruralProducer = await RuralProducer.create(req.body);

    if (!Array.isArray(crops)) {
      return res
        .status(400)
        .json({ error: "É necessário informar a lista de culturas" });
    }

    const isValidCrop = crops.every((crop: CropAttributes) => {
      return Object.values(AllowedCrops).includes(crop.cropName) && crop.area;
    });

    if (!isValidCrop) {
      return res.status(400).json({
        error:
          "Cultura inválida. Apenas as seguintes culturas são permitidas: Soja, Milho, Algodão, Café, Cana de Açucar.",
      });
    }

    // Create and associate the crops
    const cropsData: CropAttributes[] = crops.map((crop: any) => ({
      producerId: ruralProducer.dataValues.id!,
      cropName: crop.cropName,
      area: crop.area,
    }));
    await Crop.bulkCreate(cropsData);

    // Retrieve the producer object with the associated crops
    const producerWithCrops = await RuralProducer.findByPk(
      ruralProducer.dataValues.id,
      {
        include: {
          model: Crop,
          as: "crops",
        },
      }
    );

    res.status(201).json(producerWithCrops);
  } catch (error) {
    console.error("error while creating producer:", error);
    res.status(500).json({ message: "Erro ao criar produtor rural", error });
  }
};

export const readAll = async (req: Request, res: Response) => {
  try {
    const ruralProducers = await RuralProducer.findAll({
      include: {
        model: Crop,
        as: 'crops',
      },
    });
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

    const ruralProducer = await RuralProducer.findByPk(req.params.id, {
      include: {
        model: Crop,
        as: 'crops',
      },
    });
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

    // Fetch the updated producer data with associated crops
    const updatedRuralProducer = await RuralProducer.findByPk(req.params.id, {
      include: {
        model: Crop,
        as: 'crops',
      },
    });

    await RuralProducer.update(req.body, { where: { id: req.params.id } });
    res.status(200).json({ message: "Produtor rural atualizado com sucesso!", updatedRuralProducer });
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
