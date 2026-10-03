import { beforeAll, describe, expect, it, vi } from "vitest";
import { initLinkSpaceActivation } from "../keyboard";

const fireSpace = (target, modifiers = {}) => {
  const event = new KeyboardEvent("keydown", {
    key: " ",
    code: "Space",
    bubbles: true,
    cancelable: true,
    ...modifiers,
  });
  target.dispatchEvent(event);
  return event;
};

describe("initLinkSpaceActivation", () => {
  beforeAll(() => {
    initLinkSpaceActivation();
  });

  it("activates a focused link on Space", () => {
    const link = document.createElement("a");
    link.href = "/books";
    document.body.appendChild(link);
    link.focus();
    const clickSpy = vi.spyOn(link, "click").mockImplementation(() => {});

    const event = fireSpace(link);

    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(event.defaultPrevented).toBe(true);
  });

  it("ignores Space presses outside of links", () => {
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.focus();
    const clickSpy = vi.spyOn(button, "click");

    const event = fireSpace(button);

    expect(clickSpy).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it("ignores Space presses with modifier keys", () => {
    const link = document.createElement("a");
    link.href = "/books";
    document.body.appendChild(link);
    link.focus();
    const clickSpy = vi.spyOn(link, "click");

    const event = fireSpace(link, { ctrlKey: true });

    expect(clickSpy).not.toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(false);
  });

  it("ignores links without an href", () => {
    const anchor = document.createElement("a");
    document.body.appendChild(anchor);
    anchor.focus();
    const clickSpy = vi.spyOn(anchor, "click");

    fireSpace(anchor);

    expect(clickSpy).not.toHaveBeenCalled();
  });
});
