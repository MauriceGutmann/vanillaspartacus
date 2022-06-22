import { NgModule } from '@angular/core';
import { checkoutTranslationChunksConfig, checkoutTranslations } from "@spartacus/checkout/assets";
import { CheckoutRootModule, CHECKOUT_FEATURE } from "@spartacus/checkout/root";
import {CmsConfig, I18nConfig, I18nModule, provideConfig, UrlModule} from "@spartacus/core";
import { MyPaymentTypeComponent } from './my-payment-type/my-payment-type.component';
import { PayWithCryptoComponent } from './pay-with-crypto/pay-with-crypto.component';
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SpinnerModule} from "@spartacus/storefront";

@NgModule({
  declarations: [
    MyPaymentTypeComponent,
    PayWithCryptoComponent
  ],
  imports: [
    CheckoutRootModule,
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    SpinnerModule
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
