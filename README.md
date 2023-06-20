# Produtores rurais

Um projeto para gerenciar produtores rurais e suas fazendas.

<br>

## Descrição

Este projeto auxilia a gerenciar produtores rurais e suas plantações, permitindo ao 
usuário adicionar, editar e excluir informações a respeito dos produtores e suas plantações.

<br>

## Dependências

- É necessário ter Docker and Docker Compose instalados em seu sistema operacional.
  Para instruções referentes a instalação siga as documentações de [official Docker documentation](https://docs.docker.com/engine/install/) e [Docker Compose documentation](https://docs.docker.com/compose/install/).

<br>

## Instalação

1. Clone o repositório.
2. Navege até a pasta do projeto e localize o arquivo `docker-compose.yml`.
3. Execute `docker-compose up --build` para montar e iniciar os containers.

<br>

## Utilização

Para utilizar este projeto, siga esses passos:

1. Use os endpoints disponibilizados para interagir com os dados.
2. Para parar os containers, rode `docker-compose down`.

<br>

## Features

- Gerenciar produtores rurais e suas plantações.
- Calcular a área total de cada produtor e culturas.
- Filtrar produtores por múltiplos critérios.

<br>

## Endpoints

<details>
<summary>GET /rural-producers</summary>

Descrição: Busca uma lista de todos os produtores.

Example request:

`GET /rural-producers`

Example response:

`200 OK`

```json
[
	{
		"id": 1,
		"producerName": "John Doe",
		"farmName": "SmallVille",
		"taxId": "08701375000190",
		"taxIdType": "CNPJ",
		"city": "Belo Horizonte",
		"state": "Minas Gerais",
		"totalArea": 200,
		"arableArea": 150,
		"vegetationArea": 50,
		"createdAt": "2023-06-20T04:51:21.719Z",
		"updatedAt": "2023-06-20T04:51:21.719Z",
		"crops": [
			{
				"id": 1,
				"producerId": 1,
				"cropName": "Milho",
				"area": 75,
				"createdAt": "2023-06-20T04:51:21.719Z",
				"updatedAt": "2023-06-20T04:51:21.719Z"
			},
			{
				"id": 2,
				"producerId": 1,
				"cropName": "Café",
				"area": 50,
				"createdAt": "2023-06-20T04:51:21.719Z",
				"updatedAt": "2023-06-20T04:51:21.719Z"
			}
		]
	},
	{
		"id": 2,
		"producerName": "Jane Smith",
		"farmName": "BigVille",
		"taxId": "06516498032",
		"taxIdType": "CPF",
		"city": "São Paulo",
		"state": "São Paulo",
		"totalArea": 300,
		"arableArea": 200,
		"vegetationArea": 100,
		"createdAt": "2023-06-20T04:51:21.719Z",
		"updatedAt": "2023-06-20T04:51:21.719Z",
		"crops": [
			{
				"id": 3,
				"producerId": 2,
				"cropName": "Soja",
				"area": 120,
				"createdAt": "2023-06-20T04:51:21.719Z",
				"updatedAt": "2023-06-20T04:51:21.719Z"
			},
			{
				"id": 4,
				"producerId": 2,
				"cropName": "Algodão",
				"area": 80,
				"createdAt": "2023-06-20T04:51:21.719Z",
				"updatedAt": "2023-06-20T04:51:21.719Z"
			}
		]
	}
]
```
</details>

<details>
<summary>GET /rural-producers/:id</summary>

Descrição: Busca produtor pelo id.

Example request:

`GET /rural-producers/1`

Example response:

`200 OK`

```json
{
	"id": 1,
	"producerName": "John Doe",
	"farmName": "SmallVille",
	"taxId": "08701375000190",
	"taxIdType": "CNPJ",
	"city": "Belo Horizonte",
	"state": "Minas Gerais",
	"totalArea": 200,
	"arableArea": 150,
	"vegetationArea": 50,
	"createdAt": "2023-06-20T04:51:21.719Z",
	"updatedAt": "2023-06-20T04:51:21.719Z",
	"crops": [
		{
			"id": 1,
			"producerId": 1,
			"cropName": "Milho",
			"area": 75,
			"createdAt": "2023-06-20T04:51:21.719Z",
			"updatedAt": "2023-06-20T04:51:21.719Z"
		},
		{
			"id": 2,
			"producerId": 1,
			"cropName": "Café",
			"area": 50,
			"createdAt": "2023-06-20T04:51:21.719Z",
			"updatedAt": "2023-06-20T04:51:21.719Z"
		}
	]
}
```
</details>

<details>
<summary>POST /rural-producers</summary>

Descrição: Cria um novo produtor.

Example request:

`POST /rural-producers`

```json
{
		"producerName": "testing producer",
		"farmName": "testing farm",
		"taxId": "20690498000179",
		"city": "São Paulo",
		"state": "São Paulo",
		"totalArea": 100,
		"arableArea": 90.1,
		"vegetationArea": 9,
		"cropsPlanted": 25,
		"crops": [
			{
				"cropName": "Soja",
				"area": 10
    	},
    	{
				"cropName": "Café",
				"area": 15
    	}
		]
}
```

Example response:

`201 Created`

```json
{
	"id": 35,
	"producerName": "testing producer",
	"farmName": "testing farm",
	"taxId": "20690498000179",
	"taxIdType": "CNPJ",
	"city": "São Paulo",
	"state": "São Paulo",
	"totalArea": 100,
	"arableArea": 90.1,
	"vegetationArea": 9,
	"createdAt": "2023-06-20T04:55:32.015Z",
	"updatedAt": "2023-06-20T04:55:32.015Z",
	"crops": [
		{
			"id": 36,
			"producerId": 35,
			"cropName": "Soja",
			"area": 10,
			"createdAt": "2023-06-20T04:55:32.028Z",
			"updatedAt": "2023-06-20T04:55:32.028Z"
		},
		{
			"id": 37,
			"producerId": 35,
			"cropName": "Café",
			"area": 15,
			"createdAt": "2023-06-20T04:55:32.028Z",
			"updatedAt": "2023-06-20T04:55:32.028Z"
		}
	]
}
```
</details>

<details>
<summary>PUT /rural-producers/:id</summary>

Descrição: Edita dados do produtor.

Example request:

`PUT /rural-producers/1`

```json
{
  "producerName": "testing producer",
  "farmName": "testing farm",
  "taxId": "20690498000179",
  "city": "São Paulo",
  "state": "São Paulo",
  "totalArea": 100,
  "arableArea": 90,
  "vegetationArea": 9
}
```

Example response:

`200 OK`

```json
{
	"message": "Produtor rural atualizado com sucesso!",
	"updatedRuralProducer": {
		"id": 35,
		"producerName": "testing producer",
		"farmName": "testing farm",
		"taxId": "20690498000179",
		"taxIdType": "CNPJ",
		"city": "São Paulo",
		"state": "São Paulo",
		"totalArea": 100,
		"arableArea": 90.1,
		"vegetationArea": 9,
		"createdAt": "2023-06-20T04:55:32.015Z",
		"updatedAt": "2023-06-20T04:55:32.015Z",
		"crops": [
			{
				"id": 36,
				"producerId": 35,
				"cropName": "Soja",
				"area": 10,
				"createdAt": "2023-06-20T04:55:32.028Z",
				"updatedAt": "2023-06-20T04:55:32.028Z"
			},
			{
				"id": 37,
				"producerId": 35,
				"cropName": "Café",
				"area": 15,
				"createdAt": "2023-06-20T04:55:32.028Z",
				"updatedAt": "2023-06-20T04:55:32.028Z"
			}
		]
	}
}
```
</details>

<details>
<summary>DELETE /rural-producers/:id</summary>

Descrição: Deleta dados do produtor.

Example request:

`DELETE /rural-producers/1`

Example response:

`200 OK`

```json
{
	"message": "Produtor rural deletado com sucesso."
}
```
</details>

<details>
<summary>GET /rural-producers/statistics/total-farms</summary>

Descrição: Retorna o total de fazendas.

Example request:

`GET /rural-producers/statistics/total-farms`

Example response:

`200 OK`

```json
{
	"totalFarms": 2
}
```
</details>

<details>
<summary>GET /rural-producers/statistics/total-area</summary>

Descrição: Retorna a soma da área total em hectares de todas as fazendas.

Example request:

`GET /rural-producers/statistics/total-area`

Example response:

`200 OK`

```json
{
	"totalArea": 200
}
```
</details>

<details>
<summary>GET /rural-producers/statistics/producers-by-state</summary>

Descrição: Retorna a quantidade de produtores por estado.

Example request:

`GET /rural-producers/statistics/producers-by-state`

Example response:

`200 OK`

```json
{
	"producersByState": [
		{
			"state": "São Paulo",
			"count": "1"
		},
		{
			"state": "Minas Gerais",
			"count": "1"
		}
	]
}
```
</details>

<details>
<summary>GET /rural-producers/statistics/crops-count</summary>

Descrição: Retorna a quantidade de plantações para cada tipo de cultura.

Example request:

`GET /rural-producers/statistics/crops-count`

Example response:

`200 OK`

```json
{
	"cropsCount": [
		{
			"cropName": "Café",
			"count": "2"
		},
		{
			"cropName": "Soja",
			"count": "2"
		},
		{
			"cropName": "Algodão",
			"count": "1"
		},
		{
			"cropName": "Milho",
			"count": "1"
		}
	]
}
```
</details>

<details>
<summary>GET /rural-producers/statistics/land-use</summary>

Descrição: Retorna a soma do total de terra agricultável e de área de vegetação.

Example request:

`GET /rural-producers/statistics/land-use`

Example response:

`200 OK`

```json
{
	"arableArea": 440,
	"vegetationArea": 159
}
```
</details>

<br>

---

## License

This project is licensed under the MIT License.
