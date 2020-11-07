import chai from "chai";
import { dec, not } from "ramda";
import { Deck } from "./deck";

const { expect } = chai;

describe("Testing card deck", () => {
  it("should create a new deck", () => {
    const deck = new Deck();

    expect(deck.getCardsInDeck().length).to.equal(52);
    expect(deck.getCardsDealt().length).to.equal(0);
  });

  it("should have correct cards in the deck", () => {
    // TODO - Test this more exhaustively
    const cards = new Deck().getCardsInDeck();

    const hearts = cards.filter((c: any) => c.suit === "hearts");
    const spades = cards.filter((c: any) => c.suit === "spades");
    const diamonds = cards.filter((c: any) => c.suit === "diamonds");
    const clubs = cards.filter((c: any) => c.suit === "clubs");

    expect(hearts.length).to.equal(13);
    expect(spades.length).to.equal(13);
    expect(diamonds.length).to.equal(13);
    expect(clubs.length).to.equal(13);
  });

  it("should have correct value for face cards", () => {
    const expectedValue = 50;
    const deck = new Deck(expectedValue);
    const cards = deck.getCardsInDeck();

    const faceCard = cards.find((c: any) => c.face);
    expect(faceCard!.value).to.equal(expectedValue);
  });

  it("should shuffle the deck", () => {
    const deck = new Deck();
    const initialCards = deck.getCardsInDeck();
    const newCards = deck.shuffle().getCardsInDeck();

    expect(newCards.length).to.equal(52);
    expect(initialCards).not.to.equal(newCards);
  });

  it("should deal one card", () => {
    const deck = new Deck();
    const deal = deck.deal(1);
    expect(deal.length).to.equal(1);

    const [card] = deal;
    expect(card.value).to.be.a("number");
    expect(card.suit).to.be.a("string");
    expect(deck.getCardsInDeck().length).to.equal(51);
    expect(deck.getCardsDealt().length).to.equal(1);
  });

  it("should deal multiple cards", () => {
    const deck = new Deck();
    const deal = deck.deal(3);

    expect(deal.length).to.equal(3);
    expect(deck.getCardsInDeck().length).to.equal(49); // 52 -3
    expect(deck.getCardsDealt().length).to.equal(3);
  });

  it("should handle no more cards to deal", () => {
    const deck = new Deck();
    deck.deal(52);

    const deal = deck.deal(1);
    expect(deal.length).to.equal(0);
  });

  it("should handle dealing more cards than remain in the deck", () => {
    const deck = new Deck();
    deck.deal(500);

    expect(deck.getCardsInDeck().length).to.equal(0);
    expect(deck.getCardsDealt().length).to.equal(52);
  });
});
