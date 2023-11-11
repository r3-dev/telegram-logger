package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		jsonData := `{
			"id": "hk5g91zr6ypnra5",
			"created": "2023-11-11 10:05:13.914Z",
			"updated": "2023-11-11 10:05:13.914Z",
			"name": "logs",
			"type": "base",
			"system": false,
			"schema": [
				{
					"system": false,
					"id": "lf7gcj7r",
					"name": "message",
					"type": "text",
					"required": false,
					"unique": false,
					"options": {
						"min": null,
						"max": null,
						"pattern": ""
					}
				}
			],
			"indexes": [],
			"listRule": null,
			"viewRule": null,
			"createRule": null,
			"updateRule": null,
			"deleteRule": null,
			"options": {}
		}`

		collection := &models.Collection{}
		if err := json.Unmarshal([]byte(jsonData), &collection); err != nil {
			return err
		}

		return daos.New(db).SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("hk5g91zr6ypnra5")
		if err != nil {
			return err
		}

		return dao.DeleteCollection(collection)
	})
}
