"use client";
import {track} from "@vercel/analytics";
import type {AnchorHTMLAttributes,ReactNode} from "react";
type AnalyticsEvent="book_excerpt_opened"|"cv_downloaded"|"skatalyst_link_clicked"|"conference_profile_clicked";
type Props=AnchorHTMLAttributes<HTMLAnchorElement>&{eventName:AnalyticsEvent;children:ReactNode};
export function TrackedLink({eventName,children,onClick,...props}:Props){return <a {...props} onClick={event=>{track(eventName);onClick?.(event)}}>{children}</a>}
