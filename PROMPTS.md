<copilot_directives>
- Vanilla JS Expert
- Looker Studio Custom visuals Expert
</copilot_directives>
# WordCloud - Looker Studiot Custom Visual
Canvas WordCloud.
# Project tech guidelines
Vanilla CommonJS syntax.
Vanilla CSS
Allways use `canvas` allways over any other options to generate charts or visuals
## Color Palette
- pumpkin-orange: #fd5304 (primary action color)
- iris-purple: #5a33ee
- lime-green: #c0f03e
- Black: #1d1d1b (with variants)
- White: #fbf8f3
# Project Structure
- styles: `src/index.css`
- entrypoint: `src/index.js`
- configuration definition: `src/index.json`
# Looker Studio Config Reference
The visualization config defines the data and style attributes required by a visualization.

The configuration is expected as a JSON file with the following structure:
```
{
      "data": [{
        "id": string,
        "label": string,
        "elements": [{
          "type": enum(DataElement),
          "id": string,
          "label": string,
          "options": object(DataElementOptions)
        }]
      }],
      "style": [{
        "id": string,
        "label": string,
        "elements": [{
          "type": enum(StyleElement),
          "id": string,
          "label": string,
          "defaultValue": string | object
        }]
      }],
      "interactions": [{
        "id": string,
        "supportedActions": array(enum(InteractionType))
      }],
      "features": {
       "enableComparisonDateRange": boolean
      }
    }
```

Field name

Type

Description

`data[]`

`Array(object)`

The data configuration of the visualization. This configuration affects the **Data** pane of the property panel.

`data[].id`

`string`

The ID of the data section. This must be a non-empty string with no spaces.

`data[].label`

`string`

The label for the data section.

`data[].elements[]`

`string`

The data elements to render.

`data[].elements[].type`

`string` enum([DataElement](#dataelement))

The data element type to render.

`data[].elements[].id`

`string`

The ID of the data element. This must be a non-empty string with no spaces.

`data[].elements[].label`

`string`

The tooltip label for the data element.

`data[].elements[].options`

`object(DataElementOptions)`

The data options for the element. This is dependent on the [Data Element](#dataelement) Type.

`style[]`

`Array(object)`

The style configuration required by the visualization. This configuration affects the **Style** pane of the properties panel. Each object in the array represents a style element to render. The order of elements determines the order they will be rendered.

`style[].id`

`string`

The ID of the style section. This must be a non-empty string with no spaces.

`style[].label`

`string`

The label for the style section.

`style[].elements`

`Array(object)`

The style elements to render.

`style[].elements[].id`

`string`

The ID of the style element. This must be a non-empty string without spaces.

`style[].elements[].type`

`string` enum([StyleElement](#styleelement))

The style element type. E.g. font selector.

`style[].elements[].label`

`string`

The tooltip or label for the style element. This is the label text for a checkbox element and the tooltip text for other element types.

`style[].elements[].options`

`Array(object)`

The `options` for the element. This is only valid for `SELECT_SINGLE` and `SELECT_RADIO` [Style Element](#styleelement) types.

`style[].elements[].defaultValue`

`string OR object`

The default value for the style element. Invalid values will be ignored.\*

`interactions[]`

`Array(object)`

The interactions configuration of the visualization. This configuration determines whether or not it can act as a filter.

`interactions[].id`

`string`

The ID of the interaction element. This must be a non-empty string with no spaces.

`interactions[].supportedActions`

`Array` (enum([InteractionType](#interactiontype))

The possible interactions supported

`features`

`object`

The features you want to enable or disable in your visualization.

`features.enableComparisonDateRange`

`boolean`

Enable [comparison date ranges](https://support.google.com/looker-studio/answer/9272806#date_comparison). Defaults to `false` if unspecified.

\*The `defaultValue` is a string for everything except the color selectors. For colors, the `defaultValue` should be an object of the format:
```
{
        color: `string`
    }
```
DataElement
-----------

The values for data elements can be one of the following:

Enum value

Description

METRIC

Renders a metric field element.

DIMENSION

Renders a dimension field element.

MAX_RESULTS

Defines the maximum rows of data that can be requested by this vizualization

### DataElement Options

The values for data elements can be one of the following:

Enum value

Option Type

Options available

METRIC

Object

max: number - the max number of metrics  
min: number - the min number of metrics required

DIMENSION

Object

max: number - the max number of dimensions supported.  
min: number - the min number of dimensions required  
supportedTypes: the list of types supported. `supportedTypes` can include `TIME`, `GEO`, or `DEFAULT`

MAX_RESULTS

Object

max: number - the max number of rows the visualization can request. Default: 2500

StyleElement
------------

The values for style elements can be one of the following:

Enum value

Description

`defaultValue` Data Type (Config)

`value` Data Type (Message)

Default Value

FONT_COLOR

Renders the font color selector. Valid values are hex color codes.

`STRING` | `OBJECT<Color>`

`STRING` | `OBJECT<Color>`

Determined by theme.

FONT_SIZE

Renders the font size selector. Valid values are the following pixels: 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 30, 32, 36, 40, 44, 48, 60, 72, 84, 96.

`NUMBER`

`NUMBER`

`12`

FONT_FAMILY

Renders the font family selector. Valid values are the following fonts: Arial, Boogaloo, Bubblegum Sans, Chewy, Comic Sans MS, Coming Soon, Cormorant Unicase, Courier New, Droid, Droid Sans, Eater, Georgia, Google Sans, Great Vibes, Indie Flower, Lato, Lora, Montserrat, Oleo Script, Open Sans, Orbitron, Oswald, Permanent Marker, Quicksand, Raleway, Reenie Beanie, Roboto, Roboto Condensed, Syncopate, Times New Roman, Ubuntu, Ubuntu Mono, Verdana.

`STRING`

`STRING`

Determined by theme.

CHECKBOX

Renders a checkbox.

`BOOLEAN`

`BOOLEAN`

`false`

TEXTINPUT

Renders a text input box.

`STRING`

`STRING`

`""`

TEXTAREA

Renders a large text input area.

`STRING`

`STRING`

`""`

SELECT_SINGLE

Renders a dropdown with pre-defined values.

`STRING` (for defaultValue and options.label and options.value)

`STRING`

undefined

SELECT_RADIO

Renders a radio selector with pre-defined values.

`STRING` (for defaultValue and options.label and options.value)

`STRING`

undefined

FILL_COLOR

Renders a fill color selector. Valid values are Hex color codes.

`STRING` | `OBJECT<Color>`

`OBJECT<Color>`

Determined by theme.

BORDER_COLOR

Renders a border color selector. Valid values are Hex color codes.

`STRING` | `OBJECT<Color>`

`OBJECT<Color>`

Determined by theme.

AXIS_COLOR

Renders an axis color selector. Valid values are Hex color codes.

`STRING` | `OBJECT<Color>`

`OBJECT<Color>`

Determined by theme.

GRID_COLOR

Renders a grid color selector. Valid values are Hex color codes.

`STRING` | `OBJECT<Color>`

`OBJECT<Color>`

Determined by theme.

OPACITY

Renders an opacity selector, unit is %. Valid values are from 0 to 1 in increments of 0.1

`NUMBER`

`NUMBER`

`1`

LINE_WEIGHT

Renders a line weight picker. Valid values are from 0 to 5. 0 will render as None in dropdown.

`NUMBER`

`NUMBER`

LINE_STYLE

Renders a line style picker. Acceptable default values: `solid`, `dashed`, `dotted`, `double`.

`STRING`

`STRING`

`"solid"`

BORDER_RADIUS

Renders a border radius selector. Valid values are: 0, 1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100

`NUMBER`

`NUMBER`

Determined by theme.

INTERVAL

Renders an interval selector. Values are integers.

`NUMBER`

`NUMBER`

`0`

Style elements configure the icons displayed in the `Style` tab of the Property Panel.

**Note:** `"SELECT_SINGLE"` and `"SELECT_RADIO"` require you to define the elements to choose from in the drop-down.

### Style Element Options

Some style elements support options

options: array(options)

Enum value

Options Object

SELECT_SINGLE
```
        {
            label: \`string\`,
            value: \`string\`
        }
```

SELECT_RADIO
```
        {
            label: \`string\`,
            value: \`string\`
        }
```

INTERVAL
```
        {
            max: \`number\`,
            min: \`number\`
        }
```

Data Types
----------

### Object<Color>
```
{
      color: STRING<Color>,
      opacity: NUMBER<Opacity>
    }
```
### STRING<Color>

A string value containing a hex color code.

Example
```
"color": "#0000ff"
```
### NUMBER<Opacity>

A number value from 0 to 1 in increments of 0.10

Example
```
"opacity": 0.2
```
InteractionType
---------------

InteractionTypes configure the interaction options available in the `Data` style of the Property Panel. Currently, only `"FILTER"` is supported.

Enum value

Description

`"FILTER"`

Allows users to use visualization as filter.

Example config
--------------
```json
{
      "data": [{
        "id": "concepts",
        "label": "concepts",
        "elements": [
          {
            "id": "dimension1",
            "label": "first dimension",
            "type": "DIMENSION",
            "options": {
              "min": 1,
              "max": 3,
              "supportedTypes": ["DEFAULT"]
            }
          },
          {
            "id": "metric",
            "label": "metric",
            "type": "METRIC",
            "options": {
              "min": 1,
              "max": 3
            }
          }
        ]
      }],
      "style": [
        {
          "id": "colors",
          "label": "Highlight Colors",
          "elements": [
            {
              "id": "accentColor",
              "label": "Accent Color",
              "type": "SELECT_SINGLE",
              "defaultValue": "rain",
              "options": [
                {
                  "label": "Summer",
                  "value": "summer"
                },
                {
                  "label": "Fall",
                  "value": "fall"
                }
              ]
            },
            {
              "id": "reverseColor",
              "label": "Show reverse color",
              "defaultValue": false,
              "type": "CHECKBOX"
            },
            {
              "id": "fillColor",
              "label": "Fill Color",
              "defaultValue": {
                "color": "#0000ff"
              },
              "type": "FILL_COLOR"
            },
            {
              "id": "textOpacity",
              "label": "Text Opacity",
              "defaultValue": 0.2,
              "type": "OPACITY"
            },
            {
              "id": "customText",
              "label": "Custom Text",
              "defaultValue": "0.2",
              "type": "TEXTINPUT"
            }
          ]
        },
        {
          "id": "text",
          "label": "Highlight Text",
          "elements": [
            {
              "id": "textFontSize",
              "label": "Font size",
              "defaultValue": 10,
              "type": "FONT_SIZE"
            },
            {
              "id": "font",
              "label": "Font family",
              "defaultValue": "Arial",
              "type": "FONT_FAMILY"
            }
          ]
        }
      ],
      "interactions": [
        {
          "id": "interactionsConfigId",
          "supportedActions": ["FILTER"]
        }
      ],
      "features": {
        "enableComparisonDateRange": false
      }
    }
```

# `index.json` Example

```js
{
  "data": [
    {
      "id": "concepts",
      "label": "DAFO Matrix Data",
      "elements": [
        {
          "id": "dafo_property_description",
          "label": "DAFO Description",
          "type": "DIMENSION",
          "options": {
            "min": 1,
            "max": 1
          }
        },
        {
          "id": "dafo_property",
          "label": "DAFO Property",
          "type": "DIMENSION",
          "options": {
            "min": 1,
            "max": 1
          }
        },
        {
          "id": "metricID",
          "label": "Value (optional)",
          "type": "METRIC",
          "options": {
            "min": 0,
            "max": 1
          }
        }
      ]
    }
  ],
  "style": [
    {
      "id": "appearance",
      "label": "Matrix Appearance",
      "elements": [
        {
          "id": "matrixTitle",
          "label": "Matrix Title",
          "type": "TEXTINPUT",
          "defaultValue": "DAFO Analysis"
        },
        {
          "id": "strengthsTitle",
          "label": "Strengths Quadrant Title",
          "type": "TEXTINPUT",
          "defaultValue": "Fortalezas"
        },
        {
          "id": "weaknessesTitle",
          "label": "Weaknesses Quadrant Title",
          "type": "TEXTINPUT",
          "defaultValue": "Debilidades"
        },
        {
          "id": "opportunitiesTitle",
          "label": "Opportunities Quadrant Title",
          "type": "TEXTINPUT",
          "defaultValue": "Oportunidades"
        },
        {
          "id": "threatsTitle",
          "label": "Threats Quadrant Title",
          "type": "TEXTINPUT",
          "defaultValue": "Amenazas"
        }
      ]
    },
    {
      "id": "colors",
      "label": "Colors",
      "elements": [
        {
          "id": "strengthColor",
          "label": "Strengths Color",
          "type": "FILL_COLOR",
          "defaultValue": {
            "color": "#c0f03e"
          }
        },
        {
          "id": "weaknessColor",
          "label": "Weaknesses Color",
          "type": "FILL_COLOR",
          "defaultValue": {
            "color": "#fd5304"
          }
        },
        {
          "id": "opportunityColor",
          "label": "Opportunities Color",
          "type": "FILL_COLOR",
          "defaultValue": {
            "color": "#5a33ee"
          }
        },
        {
          "id": "threatColor",
          "label": "Threats Color",
          "type": "FILL_COLOR",
          "defaultValue": {
            "color": "#1d1d1b"
          }
        }
      ]
    }
  ]
}
```

# `localMessaje.js` Example to  `index.json` Example Config

```js
/**
 * This file provides the mock "data" received
 * by your visualization code when you develop
 * locally.
 * 
 * Sample data for DAFO (SWOT) Matrix
 */
export const message = {
  tables: {
    DEFAULT: [
      {
        dafo_property: ['fortalezas'],
        dafo_property_description: ['Lealtad del Cliente'],
        metricID: [85]
      },
      {
        dafo_property: ['fortalezas'],
        dafo_property_description: ['Ubicación Estratégica en el centro de la ciudad'],
        metricID: [92]
      },
      {
        dafo_property: ['fortalezas'],
        dafo_property_description: ['Ubicación Estratégica en el centro de la ciudad 21 212'],
        metricID: [92]
      },
      {
        dafo_property: ['fortalezas'],
        dafo_property_description: ['Ubicación Estratégica'],
        metricID: [92]
      },
      {
        dafo_property: ['debilidades'],
        dafo_property_description: ['Precios Altos'],
        metricID: [65]
      },
      {
        dafo_property: ['debilidades'],
        dafo_property_description: ['Precios Altos'],
        metricID: [65]
      },
      {
        dafo_property: ['debilidades'],
        dafo_property_description: ['Precios Altos'],
        metricID: [65]
      },
      {
        dafo_property: ['debilidades'],
        dafo_property_description: ['Infraestructura Antigua'],
        metricID: [58]
      },
      {
        dafo_property: ['oportunidades'],
        dafo_property_description: ['Mejora de la Experiencia'],
        metricID: [88]
      },
      {
        dafo_property: ['amenazas'],
        dafo_property_description: ['Competencia Creciente'],
        metricID: [82]
      }
    ]
  },
  fields: {
    dafo_property: [
      {
        id: 'qt_prop123',
        name: 'DAFO Property',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    dafo_property_description: [
      {
        id: 'qt_desc456',
        name: 'DAFO Description',
        type: 'TEXT',
        concept: 'DIMENSION'
      }
    ],
    metricID: [
      {
        id: 'qt_met789',
        name: 'Impact Score',
        type: 'NUMBER',
        concept: 'METRIC'
      }
    ]
  },
  style: {
    matrixTitle: {
      value: "DAFO Analysisa",
      defaultValue: "DAFO Analysis"
    },
    strengthsTitle: {
      value: "Fortalezas",
      defaultValue: "Fortalezas"
    },
    weaknessesTitle: {
      value: "Debilidades",
      defaultValue: "Debilidades"
    },
    opportunitiesTitle: {
      value: "Oportunidades",
      defaultValue: "Oportunidades"
    },
    threatsTitle: {
      value: "Amenazas",
      defaultValue: "Amenazas"
    },
    strengthColor: {
      value: {
        color: "#0097A7"
      },
      defaultValue: {
        color: "#c0f03e"
      }
    },
    weaknessColor: {
      value: {
        color: "#fd5304"
      },
      defaultValue: {
        color: "#fd5304"
      }
    },
    opportunityColor: {
      value: {
        color: "#5a33ee"
      },
      defaultValue: {
        color: "#5a33ee"
      }
    },
    threatColor: {
      value: {
        color: "#1d1d1b"
      },
      defaultValue: {
        color: "#1d1d1b"
      }
    }
  }
};

``` 