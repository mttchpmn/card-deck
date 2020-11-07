import { range } from "ramda";

import { Card, CardInterface, Face, Suit } from "./card";

export class Deck {
  private faceCardValue: number;
  private cards: Card[];
  private cardsInDeck: Card[] = [];
  private cardsDealt: Card[] = [];

  public constructor(faceCardValue = 10) {
    this.faceCardValue = faceCardValue;
    this.cards = this.buildDeck();

    this.shuffle();
  }

  public shuffle(): Deck {
    this.cardsDealt = [];

    const newCards = this.shuffleArray(this.cards);

    this.cardsInDeck = [...newCards];
    this.cardsDealt = [];

    return this;
  }

  public getCardsInDeck(): CardInterface[] {
    return this.cardsInDeck.map((c: Card) => c.getData());
  }

  public getCardsDealt(): CardInterface[] {
    return this.cardsDealt.map((c: Card) => c.getData());
  }

  public deal(num = 1): CardInterface[] {
    const cardsToDeal = this.cardsInDeck.splice(0, num);
    this.cardsDealt.push(...cardsToDeal);

    return cardsToDeal.map((c: Card) => c.getData());
  }

  private shuffleArray(cardArray: Card[]): Card[] {
    // Use Fisher-Yates shuffle algorithm to generate random sequence
    const cards = [...cardArray];

    let len = cards.length;
    let temp, i;

    while (len) {
      i = Math.floor(Math.random() * len--);
      temp = cards[len];
      cards[len] = cards[i];
      cards[i] = temp;
    }

    return cards;
  }

  private buildDeck(): Card[] {
    const s = this.buildSuit("spades");
    const c = this.buildSuit("clubs");
    const h = this.buildSuit("hearts");
    const d = this.buildSuit("diamonds");

    return [...s, ...c, ...h, ...d];
  }

  private buildSuit(suit: Suit): Card[] {
    const pipCards = range(1, 11).map((i: number) => new Card(i, suit));
    const faceCards = ["king", "queen", "jack"].map(
      (i: string) => new Card(this.faceCardValue, suit, i as Face)
    );

    return [...pipCards, ...faceCards];
  }
}
