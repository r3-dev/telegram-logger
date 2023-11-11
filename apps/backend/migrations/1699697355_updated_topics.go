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

		// add
		new_general := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "0blkcc7z",
			"name": "general",
			"type": "bool",
			"required": true,
			"unique": false,
			"options": {}
		}`), new_general)
		collection.Schema.AddField(new_general)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("aswyypc7c9oaogq")
		if err != nil {
			return err
		}

		// remove
		collection.Schema.RemoveField("0blkcc7z")

		return dao.SaveCollection(collection)
	})
}
