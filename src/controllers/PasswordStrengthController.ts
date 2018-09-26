import { BodyParam, JsonController, Post } from 'routing-controllers';

const zxcvbn = require('zxcvbn');
import { ZXCVBNResult } from 'zxcvbn';

const DEFAULT_ZXCVBN_SCORE_THRESHOLD: number = 2;

interface ZXCVBNScoreResponse {
    score: number;
    defaultThreshold: number;
}

@JsonController('/password-strength')
export class PasswordStrengthController {
  @Post('/zxcvbn')
  public zxcvbn(@BodyParam('password') password: string): ZXCVBNResult {
    return zxcvbn(password);
  }

  @Post('/zxcvbn/score/')
  public zxcvbnScore(@BodyParam('password') password: string): ZXCVBNScoreResponse {
    const zxcvbnResult = zxcvbn(password);
    return { score: zxcvbnResult.score,
            defaultThreshold: DEFAULT_ZXCVBN_SCORE_THRESHOLD};
  }
}
