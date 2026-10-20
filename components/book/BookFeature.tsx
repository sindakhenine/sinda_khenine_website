import {getCopy} from "@/i18n/server";
import {BookExperience} from "./BookExperience";

export function BookFeature({locale, standalone = false}: {locale: string; standalone?: boolean}) {
  const copy = getCopy(locale);
  const labels = {
    title: "The Subconscious Architect",
    eyebrow: copy("A book by Sinda Khenine"),
    invitation: copy("What if the life you built no longer feels like yours?"),
    description: copy("I wrote this book to understand why we keep repeating patterns we want to change. It begins with a house, and the things we never thought to question about it."),
    open: copy("Open the book"),
    coverAction: copy("Open a preview of The Subconscious Architect"),
    coverAlt: copy("Cover of The Subconscious Architect by Sinda Khenine."),
    more: copy("The story behind the book"),
    status: copy("Forthcoming"),
    caption: copy("A small look inside"),
    previewTitle: copy("Inside the book"),
    close: copy("Close preview"),
    previous: copy("Previous glimpse"),
    next: copy("Next glimpse"),
    finish: copy("Close the book"),
    navigation: copy("Explore the preview"),
    previewNote: copy("A short preview, inspired by the book."),
    parts: [copy("First lines"), copy("The blueprint"), copy("A question")],
    openingHeading: copy("Before you enter"),
    openingNote: copy("This is where the book begins."),
    openingQuote: copy("“You are good at your life.”"),
    introduction: copy("Introduction"),
    openingAfter: copy("And yet, something can still feel out of place."),
    blueprintHeading: copy("A house has more than one layer."),
    blueprintNote: copy("Choose a layer. See what it holds."),
    blueprintTitle: copy("The Living Blueprint"),
    layers: [
      {name: copy("Ground"), detail: copy("The family, culture and early experiences you were built on.")},
      {name: copy("Frame"), detail: copy("The beliefs you rely on, sometimes without knowing they are there.")},
      {name: copy("Wiring"), detail: copy("The reactions that arrive before you have time to think.")},
      {name: copy("Rooms"), detail: copy("The patterns you live in, at work, in love and when you are alone.")},
      {name: copy("Facade"), detail: copy("The self you show the world, and what stays behind the door.")}
    ],
    reflectionHeading: copy("Take this question with you."),
    reflection: copy("Which part of your life feels chosen, and which part feels inherited?"),
    reflectionNote: copy("You do not need to answer it straight away."),
    closingQuote: copy("“You never chose this house. But you are the only one who can hold the pencil now.”"),
    signature: copy("Sinda Khenine, Introduction")
  };
  return <BookExperience labels={labels} standalone={standalone}/>;
}
