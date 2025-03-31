# Data Structure

The Campanha de Louvor uses a hierarchical JSON structure to organize the campaign content. This document explains the format and organization of the data.

## File Structure

Campaign data is stored in language-specific JSON files:
- `assets/data/data.pt-br.json` - Brazilian Portuguese version

## JSON Structure

The JSON file contains an array of week objects, each with the following structure:

```json
[
  {
    "id": 1,
    "tema": "O Amor de Deus",
    "dias": [
      {
        "id": 1,
        "atributo": "Tu és Amor",
        "textos": "Jr 31.3 e IJo 4.7 e 8",
        "livros": [...]
      },
      // More days...
    ]
  },
  // More weeks...
]
```

### Week Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Unique identifier for the week (1-7) |
| `tema` | String | The theme of the week |
| `dias` | Array | Array of day objects for this week |

### Day Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | Number | Day identifier (1-7, representing Sunday-Saturday) |
| `atributo` | String | The attribute of God highlighted for this day |
| `textos` | String | Human-readable references to Bible passages |
| `livros` | Array | Array of book objects containing the actual verses |

### Book Object

| Field | Type | Description |
|-------|------|-------------|
| `nome` | String | Name of the Bible book |
| `capitulos` | Array | Array of chapter objects |

### Chapter Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Chapter number as a string |
| `versiculos` | Array | Array of verse objects |

### Verse Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Verse number as a string |
| `texto` | String | The full text of the Bible verse |

## Example

Here's a simplified example showing one day's structure:

```json
{
  "id": 1,
  "tema": "O Amor de Deus",
  "dias": [
    {
      "id": 1,
      "atributo": "Tu és Amor",
      "textos": "Jr 31.3 e IJo 4.7 e 8",
      "livros": [
        {
          "nome": "Jeremias",
          "capitulos": [
            {
              "id": "31",
              "versiculos": [
                {
                  "id": "3",
                  "texto": "De longe se me deixou ver o SENHOR, dizendo: Com amor eterno eu te amei; por isso, com benignidade te atraí."
                }
              ]
            }
          ]
        },
        // More books...
      ]
    }
  ]
}
``` 