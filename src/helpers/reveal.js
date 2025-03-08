export function reveal() {
  const startHiddenAttributeName = "start-hidden";
  const startRevealedAttributeName = "start-revealed";
  const elements = document.querySelectorAll(`[${startHiddenAttributeName}]`);
  const elementsToHide = document.querySelectorAll(
    `[${startRevealedAttributeName}]`
  );

  elements.forEach((element) => {
    element.removeAttribute(startHiddenAttributeName);
  });

  elementsToHide.forEach((element) => {
    element.remove();
  });
}
