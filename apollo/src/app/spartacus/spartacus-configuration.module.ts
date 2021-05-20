import { NgModule } from '@angular/core';
import { translationChunksConfig, translations } from "@spartacus/assets";
import { FeaturesConfig, I18nConfig, OccConfig, provideConfig, SiteContextConfig } from "@spartacus/core";
import { defaultB2bCheckoutConfig, defaultB2bOccConfig } from "@spartacus/setup";
import { defaultCmsContentProviders, layoutConfig, mediaConfig } from "@spartacus/storefront";
import { SmartEditConfig } from "@spartacus/smartedit/root";

export const defaultSmartEditConfig: SmartEditConfig = {
   smartEdit: {
      storefrontPreviewRoute: 'cx-preview',
      allowOrigin: '*',
   },
};


@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [provideConfig(layoutConfig), provideConfig(mediaConfig), ...defaultCmsContentProviders, provideConfig(<OccConfig>{
    backend: {
      occ: {
        baseUrl: 'https://apollo.sybit.de',
      }
    },
  }), provideConfig(<SiteContextConfig>{
    context: {
      currency: ['USD','EUR'],
      language: ['en','de'],
      baseSite: ['powertools-spa']
    },
  }), provideConfig(<I18nConfig>{
    i18n: {
      resources: translations,
      chunks: translationChunksConfig,
      fallbackLang: 'en'
    },
  }),
  
  provideConfig(<SmartEditConfig>{
   smartEdit: {
     allowOrigin: '*.sybit.de:443'
   },
 }),
  
   provideConfig(<FeaturesConfig>{
    features: {
      level: '3.3'
    }
  }), provideConfig(defaultB2bOccConfig), provideConfig(defaultB2bCheckoutConfig)]
})
export class SpartacusConfigurationModule { }
