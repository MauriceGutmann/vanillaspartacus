import { NgModule } from '@angular/core';
import { checkoutTranslationChunksConfig, checkoutTranslations } from "@spartacus/checkout/assets";
import { CheckoutRootModule, CHECKOUT_FEATURE } from "@spartacus/checkout/root";
import {CmsConfig, ConfigModule, I18nConfig, I18nModule, provideConfig, UrlModule} from "@spartacus/core";
import { MyPaymentTypeComponent } from './my-payment-type/my-payment-type.component';
import { PayWithCryptoComponent } from './pay-with-crypto/pay-with-crypto.component';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from "@angular/common";
import {
  CmsPageGuard,
  GlobalMessageComponentModule,
  KeyboardFocusModule,
  OutletModule,
  PageLayoutModule, PageSlotModule,
  SpinnerModule,
  StorefrontComponentModule
} from "@spartacus/storefront";
import { PaymentSiteComponent } from './payment-site/payment-site.component';
import { XrpPaymentComponent } from './xrp-payment/xrp-payment.component';

const staticRoutes: Routes = [{
  path: 'payment-site',
  component: PaymentSiteComponent // Custom page component,

}];

@NgModule({
  declarations: [
    MyPaymentTypeComponent,
    PayWithCryptoComponent,
    PaymentSiteComponent,
    XrpPaymentComponent
  ],
  imports: [
    CheckoutRootModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    SpinnerModule,
    ConfigModule.withConfig({
      cmsComponents: {
        PaymentSite: {
          component: PaymentSiteComponent
        }
      }
    }),
    RouterModule.forChild(staticRoutes),
    StorefrontComponentModule,
    OutletModule,
    KeyboardFocusModule,
    PageLayoutModule,
    PageSlotModule,
    GlobalMessageComponentModule
  ],
  providers: [provideConfig(<CmsConfig>{
    featureModules: {
      [CHECKOUT_FEATURE]: {
        module: () =>
          import('@spartacus/checkout').then((m) => m.CheckoutModule),
      },
    }

  }),
  provideConfig(<I18nConfig>{
    i18n: {
      resources: checkoutTranslations,
      chunks: checkoutTranslationChunksConfig,
    },
  }),
    provideConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutPaymentType: {
          component: MyPaymentTypeComponent
        }
      }
    })
  ]
})
export class CheckoutFeatureModule { }
