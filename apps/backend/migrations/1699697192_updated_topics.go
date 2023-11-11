package migrations

import (
	"encoding/json"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("aswyypc7c9oaogq")
		if err != nil {
			return err
		}

		// update
		edit_logs := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "7lujhslk",
			"name": "logs",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "hk5g91zr6ypnra5",
				"cascadeDelete": true,
				"minSelect": null,
				"maxSelect": null,
				"displayFields": []
			}
		}`), edit_logs)
		collection.Schema.AddField(edit_logs)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("aswyypc7c9oaogq")
		if err != nil {
			return err
		}

		// update
		edit_logs := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "7lujhslk",
			"name": "logs",
			"type": "relation",
			"required": false,
			"unique": false,
			"options": {
				"collectionId": "hk5g91zr6ypnra5",
				"cascadeDelete": false,
				"minSelect": null,
				"maxSelect": null,
				"displayFields": []
			}
		}`), edit_logs)
		collection.Schema.AddField(edit_logs)

		return dao.SaveCollection(collection)
	})
}
