<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->


## Prototype architecture
- All interface colors and image scrims use semantic tokens in src/styles.css so the palette remains consistent throughout the site.
- The specialist directory uses a separate pure filtering module; verified doctor identities stay separate from explicitly illustrative filter metadata to avoid false clinical details.
- Appointment and profile dialogs are frontend-only and never persist or transmit patient inputs because this is a visual prototype.
- Navigation to homepage sections uses root-relative anchors so shared navigation works from treatment pages too.
- Homepage carousels share useCarousel/CarouselControls (native scroll-snap, arrow keys); the hero centre search reaches the centre section via a window CustomEvent so sections stay decoupled.
