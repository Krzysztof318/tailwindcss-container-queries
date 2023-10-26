import { expect } from '@jest/globals'
import { html, css, run } from './run'

it('container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div
            class="qc-queryable qc-queryable-normal qc-queryable/sidebar qc-queryable-normal/sidebar qc-queryable-[size]/sidebar"
          >
            <div class="qc-md:underline"></div>
            <div class="qc-md/container1:underline"></div>
            <div class="qc-md/container2:underline"></div>
            <div class="qc-md/container10:underline"></div>

            <div class="qc-sm:underline"></div>
            <div class="qc-sm/container1:underline"></div>
            <div class="qc-sm/container2:underline"></div>
            <div class="qc-sm/container10:underline"></div>

            <div class="qc-lg:underline"></div>
            <div class="qc-lg/container1:underline"></div>
            <div class="qc-lg/container2:underline"></div>
            <div class="qc-lg/container10:underline"></div>
            <div class="qc-[1024px]:underline"></div>
            <div class="qc-[1024px]/container1:underline"></div>
            <div class="qc-[1024]/container1:underline"></div>

            <div class="qc-[312px]:underline"></div>
            <div class="qc-[200rem]:underline"></div>
            <div class="qc-[123px]:underline"></div>
          </div>
        `,
      },
    ],
    theme: {
      'qc-containers': {
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
    },
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .qc-queryable {
        container-type: inline-size;
      }

      .qc-queryable-normal {
        container-type: normal;
      }

      .qc-queryable\/sidebar {
        container-type: inline-size;
        container-name: sidebar;
      }

      .qc-queryable-normal\/sidebar {
        container-type: normal;
        container-name: sidebar;
      }

      .qc-queryable-\[size\]\/sidebar {
        container-type: size;
        container-name: sidebar;
      }

      @container (min-width: 123px) {
        .qc-\[123px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 200rem) {
        .qc-\[200rem\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 312px) {
        .qc-\[312px\]\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (min-width: 640px) {
        .qc-sm\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (min-width: 640px) {
        .qc-sm\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (min-width: 640px) {
        .qc-sm\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 640px) {
        .qc-sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (min-width: 768px) {
        .qc-md\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (min-width: 768px) {
        .qc-md\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (min-width: 768px) {
        .qc-md\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 768px) {
        .qc-md\:underline {
          text-decoration-line: underline;
        }
      }

      @container container1 (min-width: 1024px) {
        .qc-lg\/container1\:underline {
          text-decoration-line: underline;
        }
        .qc-\[1024px\]\/container1\:underline {
          text-decoration-line: underline;
        }
      }

      @container container2 (min-width: 1024px) {
        .qc-lg\/container2\:underline {
          text-decoration-line: underline;
        }
      }

      @container container10 (min-width: 1024px) {
        .qc-lg\/container10\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 1024px) {
        .qc-lg\:underline {
          text-decoration-line: underline;
        }
        .qc-\[1024px\]\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('should be possible to use default container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div>
            <div class="qc-md:underline"></div>
            <div class="qc-lg:underline"></div>
            <div class="qc-sm:underline"></div>
            <div class="qc-xl:underline"></div>
            <div class="qc-2xl:underline"></div>
          </div>
        `,
      },
    ],
    theme: {},
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      @container (min-width: 640px) {
        .qc-sm\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 768px) {
        .qc-md\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 1024px) {
        .qc-lg\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 1280px) {
        .qc-xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 1536px) {
        .qc-2xl\:underline {
          text-decoration-line: underline;
        }
      }
    `)
  })
})

it('container max & range queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div
            class="qc-queryable"
          >
            <div class="qc-max-lg:underline"></div>
            <div class="qc-max-xl:underline"></div>

            <div class="qc-sm:qc-max-lg:underline"></div>
            <div class="qc-md/container1:qc-max-xl/container1:underline"></div>
          </div>
        `,
      },
    ],
    theme: {
      'qc-containers': {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .qc-queryable {
        container-type: inline-size;
      }

      @container container1 (min-width: 768px) {
        @container container1 (width < 1280px) {
          .qc-md\/container1\:qc-max-xl\/container1\:underline {
            text-decoration-line: underline;
          }
        }
      }

      @container (width < 1280px) {
        .qc-max-xl\:underline {
          text-decoration-line: underline;
        }
      }

      @container (width < 1024px) {
        .qc-max-lg\:underline {
          text-decoration-line: underline;
        }
      }

      @container (min-width: 640px) {
        @container (width < 1024px) {
          .qc-sm\:qc-max-lg\:underline {
            text-decoration-line: underline;
          }
        }
      }
    `)
  })
})

it('container fixed size', () => {
  let config = {
    content: [
      {
        raw: html`
          <div class="qc-queryable">
            <div class="qc-container"></div>
            <div class="qc-sm:qc-container"></div>

            <div class="qc-container/container1"></div>
            <div class="qc-md:qc-container/container1"></div>
          </div>
        `,
      },
    ],
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
        '640px',
        '1024px',
      ]
    },
    corePlugins: { preflight: false },
  }

  let input = css`
    @tailwind components;
    @tailwind utilities;
  `

  return run(input, config).then((result) => {
    expect(result.css).toMatchFormattedCss(css`
      .qc-container {
        width: 100cqi;
        @container (min-width: 240px) {
          max-width: 240px;
        }
        @container (min-width: 640px) {
          max-width: 640px;
        }
        @container (min-width: 1024px) {
          max-width: 1024px;
        }
      }

      .qc-container\/container1 {
        @container container1 {
          width: 100cqi;
        }
        @container container1 (min-width: 240px) {
          max-width: 240px;
        }
        @container container1 (min-width: 640px) {
          max-width: 640px;
        }
        @container container1 (min-width: 1024px) {
          max-width: 1024px;
        }
      }

      .qc-queryable {
        container-type: inline-size;
      }

      @container (min-width: 640px) {
        .qc-sm\:qc-container {
          width: 100cqi;
          @container (min-width: 240px) {
            max-width: 240px;
          }
          @container (min-width: 640px) {
            max-width: 640px;
          }
          @container (min-width: 1024px) {
            max-width: 1024px;
          }
        }
      }

      @container (min-width: 768px) {
        .qc-md\:qc-container\/container1 {
          @container container1 {
            width: 100cqi;
          }
          @container container1 (min-width: 240px) {
            max-width: 240px;
          }
          @container container1 (min-width: 640px) {
            max-width: 640px;
          }
          @container container1 (min-width: 1024px) {
            max-width: 1024px;
          }
        }
      }
    `)
  })
})