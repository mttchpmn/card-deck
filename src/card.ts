export type Suit = "spades" | "clubs" | "hearts" | "diamonds";
export type Face = "king" | "queen" | "jack";

export type CardInterface = {
  value: number;
  suit: Suit;
  face?: Face;
};

export class Card implements CardInterface {
  public value: number;
  public suit: Suit;
  public face?: Face;

  public constructor(value: number, suit: Suit, face?: Face) {
    this.value = value;
    this.suit = suit;
    this.face = face;
  }

  public getData(): CardInterface {
    return {
      value: this.value,
      suit: this.suit,
      ...(this.face && { face: this.face }),
    };
  }
}
