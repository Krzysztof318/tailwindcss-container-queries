import { expect } from '@jest/globals'
import { html, css, run } from './run'

it('container queries', () => {
  let config = {
    content: [
      {
        raw: html`
          <div
            class="qc-container qc-container-normal qc-container/sidebar qc-container-normal/sidebar qc-container-[size]/sidebar"
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
      containers: {
        sm: '320px',
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
      .qc-container {
        container-type: inline-size;
      }

      .qc-container-normal {
        container-type: normal;
      }

      .qc-container\/sidebar {
        container-type: inline-size;
        container-name: sidebar;
      }

      .qc-container-normal\/sidebar {
        container-type: normal;
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
