/**
 * @kbg/ui-kit — the KBG visual and behavioural language.
 *
 * Artifact 3 of the Platform Surfaces canon. Read `docs/canon/surfaces/06-experience.md` first:
 * this package is that spec made executable, not a general component library.
 *
 * Import the tokens once, at your app root:
 *     import '@kbg/ui-kit/tokens.css';
 */
export {
  LoadingState, EmptyState, FilteredEmptyState, DeniedState,
  PartialState, StaleState, TooMuchState, ErrorState,
} from './states/States';

export { SyncIndicator, deriveSyncState } from './SyncIndicator';
export type { SyncState, SyncIndicatorProps } from './SyncIndicator';
