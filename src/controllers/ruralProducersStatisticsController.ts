import { Request, Response } from "express";
import RuralProducer from "../models/ruralProducerModel";
import Crop from "../models/cropModel";
import { Sequelize } from "sequelize";

export const getTotalFarms = async (req: Request, res: Response) => {
  try {
    const totalFarms = await RuralProducer.count();
    res.status(200).json({ totalFarms });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar o total de fazendas", error });
  }
};

export const getTotalArea = async (req: Request, res: Response) => {
  try {
    const totalArea = await RuralProducer.sum('totalArea');
    res.status(200).json({ totalArea });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar área total", error });
  }
};

export const getProducersByState = async (req: Request, res: Response) => {
  try {
    const producersByState = await RuralProducer.findAll({
      attributes: ['state', [Sequelize.fn('COUNT', Sequelize.col('state')), 'count']],
      group: ['state'],
    });
    res.status(200).json({ producersByState });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar produtores por estado", error });
  }
};

export const getCropsCount = async (req: Request, res: Response) => {
  try {
    const cropsCount = await Crop.findAll({
      attributes: ['cropName', [Sequelize.fn('COUNT', Sequelize.col('cropName')), 'count']],
      group: ['cropName'],
    });
    res.status(200).json({ cropsCount });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar quantidades de culturas", error });
  }
};

export const getLandUse = async (req: Request, res: Response) => {
  try {
    const arableArea = await RuralProducer.sum('arableArea');
    const vegetationArea = await RuralProducer.sum('vegetationArea');
    res.status(200).json({ arableArea, vegetationArea });
  } catch (error) {
    res.status(400).json({ message: "Erro ao buscar dados do uso de terra", error });
  }
};
