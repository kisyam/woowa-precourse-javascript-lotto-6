import GAME_GUIDE_MESSAGE from './constants/messages.js';
import GameCenter from './domains/GameCenter.js';
import Lotto from './domains/Lotto.js';
import Validator from './utils/Validator.js';
import View from './views/View.js';

class App {
  #view = new View();

  constructor() {
    this.lottos = null;
    this.winningNumbers = null;
    this.bonusNumber = null;
  }

  async play() {
    await this.buyingLottos();
    await this.inputWinningNumbers();
    await this.requestBonusNumber();
    this.printWinningStats();
  }

  async buyingLottos() {
    const money = await this.#view.inputMoney();
    this.lottos = new GameCenter(money);
    this.lottos.printCount();
    this.lottos.printList();
  }

  async inputWinningNumbers() {
    const winningNumbers = await this.#view.inputWinningNumbers();

    this.winningNumbers = winningNumbers;
  }

  async requestBonusNumber() {
    const bonusNumber = await this.#view.inputBonusNumber();

    Validator.findDuplicateNumbers(bonusNumber, this.winningNumbers);

    this.bonusNumber = bonusNumber;
  }

  printWinningStats() {
    this.#view.outputWinningStats();
    const lottoRanks = this.lottos.getRanks(
      this.winningNumbers,
      this.bonusNumber,
    );

    this.lottos.printWinningDetails(lottoRanks);
    this.lottos.printRate(lottoRanks);
  }
}

const app = new App();
app.play();

export default App;
