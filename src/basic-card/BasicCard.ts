import { CardContents } from '@src/basic-card/_types/basic-card'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

@customElement('basic-card')
export class BasicCard extends LitElement {
  @property({ type: String })
  title = 'card title'

  @property({
    converter(value) {
      if (value === null) {
        return []
      }
      const val = value?.substring(1, value.length - 1)
      const regex = /\{[^}]+\}/g
      const matches = val.match(regex)
      if (matches == null) {
        return []
      }
      const res: CardContents = matches.map((match) => {
        try {
          const jsonStr = match.replace(/(\w+):/g, '"$1":').replace(/'/g, '"')
          return JSON.parse(jsonStr)
        } catch (error) {
          console.error('Parsing error:', error)
          return []
        }
      })

      return res
    },
    type: Array,
  })
  contents: CardContents = []

  render() {
    return html`
      <div class="container">
        <header class="title">
          <strong> ${this.title} </strong>
        </header>
        <main class="contents">
          ${repeat(
            this.contents,
            (content) => content.header,
            (content) =>
              html`
                <p class="content-header">${content.header}:</p>
                <p class="content">${content.content}</p>
              `
          )}
        </main>
      </div>
    `
  }

  static styles = [
    css`
      :host {
        display: block;
        font-family: 'Helvetica';
      }
      .container {
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        grid-template-rows: auto;
        background-color: #f7f7f7;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        min-width: 240px;
        max-width: 480px;
        min-height: 120px;
        grid-gap: 16px;
        padding: 8px;
      }

      .title {
        grid-column: 1 / end;
        grid-row: 1;
        margin: 0;
        text-align: center;
        font-size: 24px;
        height: fit-content;
        background-color: #e8e8e8;
        border: 1px solid #fbfbfb;
        border-radius: 4px;
        padding: 4px;
        line-height: 1.2;
      }

      .contents {
        grid-column: 1 / end;
        display: grid;
        grid-template-columns: repeat(12, [col-start] 1fr);
        width: 100%;
        grid-gap: 12px;
      }

      .content-header {
        grid-column:  1 / 4;
        font-weight: bold;
        margin: 0;
      }

      .content {
        grid-column: 4 / end;
        margin: 0;
      }
    `,
  ]
}
