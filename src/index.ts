import plugin from 'tailwindcss/plugin'
import { CSSRuleObject, KeyValuePair } from 'tailwindcss/types/config'

export = plugin(
  function containerQueries({ matchComponents, matchUtilities, matchVariant, theme }) {
    let queryablesValues: Record<string, string> = theme('qc-queryables') ?? {}
    let containersValues: Array<string> = theme('qc-containers') ?? {}

    function parseValue(value: string) {
      let numericValue = value.match(/^(\d+\.\d+|\d+|\.\d+)\D+/)?.[1] ?? null
      if (numericValue === null) return null

      return parseFloat(value)
    }

    function getFixedSizeContainers(modifier: string | null): CSSRuleObject {
      let sizes = [...containersValues]
      sizes.sort((a,b) => {
        let aVal = parseFloat(a)
        let bVal = parseFloat(b)
        if (aVal === null || bVal === null) return 0
        // Sort values themselves regardless of unit
        if (aVal - bVal !== 0) return aVal - bVal
        return 0
      })
      let rule: CSSRuleObject = {}
      rule.width = '100%'
      if (theme('container.center', false)) {
        rule.marginRight = 'auto';
        rule.marginLeft = 'auto;'
      }
      sizes.forEach((val) => 
        rule[`@container ${modifier ?? ''} (min-width: ${val})`] = {
          'max-width': val
        }
      )
      return rule
    }

    matchComponents(
      {
        'qc-container': (value, { modifier }) => {
          return getFixedSizeContainers(modifier)
        }
      },
      {
        values: {
          DEFAULT: 'n/a'
        },
        modifiers: 'any'
      }
    )

    matchUtilities(
      {
        'qc-queryable': (value, { modifier }) => {
          return {
            'container-type': value,
            'container-name': modifier,
          }
        },
      },
      {
        values: {
          DEFAULT: 'inline-size',
          normal: 'normal',
        },
        modifiers: 'any',
      }
    )

    const sortMin: (
      a: { value: string; modifier: string | null },
      b: { value: string; modifier: string | null }
    ) => number = (aVariant, zVariant) => {
      let a = parseFloat(aVariant.value)
      let z = parseFloat(zVariant.value)

      if (a === null || z === null) return 0

      // Sort values themselves regardless of unit
      if (a - z !== 0) return a - z

      let aLabel = aVariant.modifier ?? ''
      let zLabel = zVariant.modifier ?? ''

      // Explicitly move empty labels to the end
      if (aLabel === '' && zLabel !== '') {
        return 1
      } else if (aLabel !== '' && zLabel === '') {
        return -1
      }

      // Sort labels alphabetically in the English locale
      // We are intentionally overriding the locale because we do not want the sort to
      // be affected by the machine's locale (be it a developer or CI environment)
      return aLabel.localeCompare(zLabel, 'en', { numeric: true })
    }

    const sortMax: (
      a: { value: string; modifier: string | null },
      b: { value: string; modifier: string | null }
    ) => number = (aVariant, zVariant) => {
      let a = parseFloat(aVariant.value)
      let z = parseFloat(zVariant.value)

      if (a === null || z === null) return 0

      // Sort values themselves regardless of unit
      if (z - a !== 0) return z - a

      let aLabel = aVariant.modifier ?? ''
      let zLabel = zVariant.modifier ?? ''

      // Explicitly move empty labels to the end
      if (aLabel === '' && zLabel !== '') {
        return 1
      } else if (aLabel !== '' && zLabel === '') {
        return -1
      }

      // Sort labels alphabetically in the English locale
      // We are intentionally overriding the locale because we do not want the sort to
      // be affected by the machine's locale (be it a developer or CI environment)
      return aLabel.localeCompare(zLabel, 'en', { numeric: true })
    }

    matchVariant(
      'qc',
      (value = '', { modifier }) => {
        let parsed = parseValue(value)

        return parsed !== null ? `@container ${modifier ?? ''} (min-width: ${value})` : []
      },
      {
        values: queryablesValues,
        sort: sortMin,
      }
    )

    matchVariant(
      'qc-max',
      (value = '', { modifier }) => {
        let parsed = parseValue(value)

        return parsed !== null ? `@container ${modifier ?? ''} (width < ${value})` : []
      },
      {
        values: queryablesValues,
        sort: sortMax,
      }
    )
  },
  {
    theme: {
      'qc-queryables': {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      'qc-containers': [
        '240px',
        '320px',
        '480px',
        '640px',
        '768px',
        '1024px',
        '1280px',
      ]
    },
  }
)
