import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import {
  HERO, TIERS_HEADER, TIERS, TIERS_NOTE, TIER_CHIPS,
  COMPARE_COLS, PRICE_ROW_LABEL, WIN_ROWS, CALLOUT,
  FEATURES_HEADER, FEATURE_GROUPS, CTA_BAND, FOOTNOTE,
  SHOW_IN_BUILD, WinRow, CompareCol,
} from '../../content/why-seejobrun-content';

@Component({
  selector: 'app-why-seejobrun',
  standalone: true,
  imports: [],
  templateUrl: './why-seejobrun.component.html',
  styleUrl: './why-seejobrun.component.scss',
})
export class WhySeeJobRunComponent {
  readonly hero = HERO;
  readonly tiersHeader = TIERS_HEADER;
  readonly tiers = TIERS;
  readonly tiersNote = TIERS_NOTE;
  readonly chips = TIER_CHIPS;
  readonly cols = COMPARE_COLS;
  readonly priceRowLabel = PRICE_ROW_LABEL;
  readonly callout = CALLOUT;
  readonly featuresHeader = FEATURES_HEADER;
  readonly groups = FEATURE_GROUPS;
  readonly ctaBand = CTA_BAND;
  readonly footnote = FOOTNOTE;

  constructor(title: Title, meta: Meta) {
    title.setTitle('Why See Job Run — More features, lower price, easier to use');
    meta.updateTag({
      name: 'description',
      content:
        'See Job Run gives small general contractors more features for less: scheduling, ' +
        'subcontractor bids, photos, quotes and crew in one app. Plans from $69/mo, 60-day free trial.',
    });
  }

  /** In-build rows hidden by default; shown (as "Coming soon") only when opted in. */
  get winRows(): WinRow[] {
    return WIN_ROWS.filter((r) => !r.inBuild || SHOW_IN_BUILD !== false);
  }
  isComingSoon(row: WinRow): boolean {
    return !!row.inBuild && SHOW_IN_BUILD === 'coming-soon';
  }

  cellOf(row: WinRow, col: CompareCol): string { return row.cells[col.key] ?? 'bar'; }
  isCheck(row: WinRow, col: CompareCol): boolean { return this.cellOf(row, col) === 'check'; }
  isBar(row: WinRow, col: CompareCol): boolean { return this.cellOf(row, col) === 'bar'; }
}
