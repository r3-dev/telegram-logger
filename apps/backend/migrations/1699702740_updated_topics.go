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
		edit_apiKey := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "arrdjxpj",
			"name": "apiKey",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_apiKey)
		collection.Schema.AddField(edit_apiKey)

		// update
		edit_chatOrTopicId := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "fxdptcac",
			"name": "chatOrTopicId",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_chatOrTopicId)
		collection.Schema.AddField(edit_chatOrTopicId)

		// update
		edit_isGeneral := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "0blkcc7z",
			"name": "isGeneral",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), edit_isGeneral)
		collection.Schema.AddField(edit_isGeneral)

		return dao.SaveCollection(collection)
	}, func(db dbx.Builder) error {
		dao := daos.New(db);

		collection, err := dao.FindCollectionByNameOrId("aswyypc7c9oaogq")
		if err != nil {
			return err
		}

		// update
		edit_apiKey := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "arrdjxpj",
			"name": "uuid",
			"type": "text",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null,
				"pattern": ""
			}
		}`), edit_apiKey)
		collection.Schema.AddField(edit_apiKey)

		// update
		edit_chatOrTopicId := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "fxdptcac",
			"name": "chatId",
			"type": "number",
			"required": false,
			"unique": false,
			"options": {
				"min": null,
				"max": null
			}
		}`), edit_chatOrTopicId)
		collection.Schema.AddField(edit_chatOrTopicId)

		// update
		edit_isGeneral := &schema.SchemaField{}
		json.Unmarshal([]byte(`{
			"system": false,
			"id": "0blkcc7z",
			"name": "general",
			"type": "bool",
			"required": false,
			"unique": false,
			"options": {}
		}`), edit_isGeneral)
		collection.Schema.AddField(edit_isGeneral)

		return dao.SaveCollection(collection)
	})
}
