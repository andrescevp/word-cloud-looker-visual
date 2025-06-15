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
