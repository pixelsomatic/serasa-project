import request from 'supertest';
import app from '../app'; 
import RuralProducer  from '../models/ruralProducerModel';
import Crop  from '../models/cropModel';
import { startServer, stopServer } from '../server';
import { newProducer } from '../mocks/mockedData';

describe('RuralProducersController', () => {
  beforeAll(() => {
     return startServer();
  });

  afterAll(() => {
    return stopServer();
  });

  afterEach(async () => {
    // Clean up the database after each test
    await RuralProducer .destroy({ where: {} });
    await Crop.destroy({ where: {} });
  });

  describe('create', () => {
    it('should create a new producer and return 201 status', async () => {
      const res = await request(app)
        .post('/rural-producers')
        .send(newProducer);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('should return 400 if the sum of arable and vegetation areas is greater than the total area', async () => {
      const producer = { ...newProducer, arableArea: 50, vegetationArea: 60, totalArea: 100 };
      const res = await request(app).post('/rural-producers').send(producer);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('A soma da área agricultável e vegetação não pode ser maior do que a área total da fazenda.');
    });
    
    it('should return 400 if the taxId is invalid', async () => {
      const producer = { ...newProducer, taxId: 'invalidTaxId' };
      const res = await request(app).post('/rural-producers').send(producer);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('CPF ou CNPJ inválido.');
    });

    it('should return 400 if the producer already exists', async () => {
      await request(app).post('/rural-producers').send(newProducer); // Create a producer
      const res = await request(app).post('/rural-producers').send(newProducer); // Try to create the same producer again
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Este produtor já existe.');
    });

    it('should return 400 if the crops are invalid', async () => {
      const producer = { ...newProducer, crops: [{ cropName: 'InvalidCrop', area: 10 }] };
      const res = await request(app).post('/rural-producers').send(producer);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('Cultura inválida. Apenas as seguintes culturas são permitidas: Soja, Milho, Algodão, Café, Cana de Açucar.');
    });
  
  });

  describe('GET /rural-producers', () => {
    it('should fetch all rural producers', async () => {
      const res = await request(app).get('/rural-producers');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /rural-producers/:id', () => {
    let validId: number;

    beforeEach(async () => {
      const res = await request(app).post('/rural-producers').send(newProducer);
      validId = res.body.id;
    });

    it('should fetch a single rural producer', async () => {
      const res = await request(app).get(`/rural-producers/${validId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
    });
  
    it('should return 404 if no producer with the given id exists', async () => {
      const invalidId = 9999;
      const res = await request(app).get(`/rural-producers/${invalidId}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error');
    });
    
  });

  describe('PUT /rural-producers/:id', () => {
    let id: number;

    beforeEach(async () => {
      const res = await request(app).post('/rural-producers').send(newProducer);
      id = res.body.id;
    });

    it('should update a rural producer', async () => {
      const updatedProducer = { ...newProducer, arableArea: 80 };
  
      const res = await request(app)
        .put(`/rural-producers/${id}`)
        .send(updatedProducer);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  
    it('should return 400 if the sum of arable and vegetation areas is greater than the total area', async () => {
      const updatedProducer = { ...newProducer, arableArea: 50, vegetationArea: 60, totalArea: 100 };
      const res = await request(app).put(`/rural-producers/${id}`).send(updatedProducer);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('A soma da área agricultável e vegetação não pode ser maior do que a área total da fazenda.');
    });

    it('should return 400 if the taxId is invalid', async () => {
      const updatedProducer = { ...newProducer, taxId: 'invalidTaxId' };
      const res = await request(app).put(`/rural-producers/${id}`).send(updatedProducer);
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual('CPF ou CNPJ inválido.');
    });

    it('should return 404 if the producer does not exist', async () => {
      const nonExistingId = 999999;
      const res = await request(app).put(`/rural-producers/${nonExistingId}`).send(newProducer);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Produtor rural não encontrado.');
    });

  });

  describe('DELETE /rural-producers/:id', () => {
    let id: number;

    beforeEach(async () => {
      const res = await request(app).post('/rural-producers').send(newProducer);
      id = res.body.id;
    });

    it('should delete a rural producer', async () => {
      const res = await request(app).delete(`/rural-producers/${id}`);
  
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message');
    });
  
    it('should return 404 if the producer does not exist', async () => {
      const nonExistingId = 999999;
      const res = await request(app).delete(`/rural-producers/${nonExistingId}`).send(newProducer);
      expect(res.statusCode).toEqual(404);
      expect(res.body.error).toEqual('Produtor rural não encontrado.');
    });

  });  
});
