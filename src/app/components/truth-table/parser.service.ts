import { Injectable } from '@angular/core';
import { parse } from '../../../assets/js/truth-table-parser.js';

@Injectable({
  providedIn: 'root'
})
export class ParserService {

  constructor() { }

  parseExpression(expression: string) {
    try {
      return parse(this.addProductOperator(expression.replace(/ /g, "")));
    } catch (error) {
      return { error: error };
    }
  }

  /* add product(*) operator to a boolean algebra expression*/
  addProductOperator(booleanExpression: string) {
    let booleanTransformed = '';
    for (let index = 0; index < booleanExpression.length; index++) {
      if (booleanExpression[index + 1] && /\)/.test(booleanExpression[index]) && /\(/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else if (booleanExpression[index + 1] && /[a-zA-ZñÑ]/.test(booleanExpression[index]) && /[a-zA-ZñÑ]/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else if (booleanExpression[index + 1] && /\)/.test(booleanExpression[index]) && /[a-zA-ZñÑ]/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else if (booleanExpression[index + 1] && /[a-zA-ZñÑ]/.test(booleanExpression[index]) && /\(/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else if (booleanExpression[index + 1] && /\xb4/.test(booleanExpression[index]) && /[a-zA-ZñÑ]/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else if (booleanExpression[index + 1] && /\xb4/.test(booleanExpression[index]) && /\(/.test(booleanExpression[index + 1])) {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}*`;
      } else {
        booleanTransformed = `${booleanTransformed}${booleanExpression[index]}`;
      }
    }
    return booleanTransformed;
  }
}
