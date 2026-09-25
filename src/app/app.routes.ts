import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FeaturesComponent } from './pages/features/features.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AboutComponent } from './pages/about/about.component';
import { LearnComponent } from './pages/learn/learn.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CompareComponent } from './pages/compare/compare.component';
import { WhySeeJobRunComponent } from './pages/why-seejobrun/why-seejobrun.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'best-app-for-contractors', component: CompareComponent },
  // New marketing "Why See Job Run" / pricing page. Kept as its own route so the
  // existing /pricing (current billing tiers) is untouched until the new plan model
  // ships; Poul can point /pricing here or link it in nav when ready.
  { path: 'why-seejobrun', component: WhySeeJobRunComponent },
];
