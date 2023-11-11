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
		edit_general := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "0blkcc7z",
			"name": "general",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), edit_general)
		collection.Schema.AddField(edit_general)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("aswyypc7c9oaogq")
		if err != nil {
			return err
		}

		// update
		edit_general := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "0blkcc7z",
			"name": "general",
			"type": "bool",
			"required": true,
			"unique": false,
			"options": {}
		}`), edit_general)
		collection.Schema.AddField(edit_general)

		return dao.SaveCollection(collection)
	})
}
