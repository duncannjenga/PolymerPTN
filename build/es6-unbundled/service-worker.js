/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","1d59e0ed57fa72c8c192147925eb844c"],["bower_components/app-layout/app-drawer/app-drawer.html","e14029895a8741ac6fde01218be08dbc"],["bower_components/app-layout/app-header-layout/app-header-layout.html","d49aecd0524a516cdd0dc8682aca664d"],["bower_components/app-layout/app-header/app-header.html","5709d05bc48985d695ccb55d74844837"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","68c44a7d0ce56eec5179385ddd1fcad5"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","de8773b7d74d4397bf623ce90136544a"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","9d611dc2e2a68080603abfc412029892"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","68c9a3c4a580c2062803443ef39463c8"],["bower_components/app-layout/app-scroll-effects/effects/material.html","93d85d4f6d42fd57d73fda270f8b8b5d"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","10872917947a78a2d05ed70457d7e6c6"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","c6d97d3f7b0215028fb4f1eb5efabfae"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","d5c4b389ef48889f231aca4a96168a52"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","af6cf17fbb4f94216eea9d2e6c26a775"],["bower_components/app-layout/app-toolbar/app-toolbar.html","1969068eeac3ed606025f04bf7871282"],["bower_components/app-layout/helpers/helpers.html","80b60701ea1a3dbb06fb361a9f92d9b5"],["bower_components/app-route/app-location.html","672597db8ff4c77e7c8efd11b94b2ce0"],["bower_components/app-route/app-route-converter-behavior.html","4b3a984394c388b521de3cfda071a01e"],["bower_components/app-route/app-route.html","a316d2cc10e221defeac7851dafaaafa"],["bower_components/datetime-input/date-input.html","17a0cc69c489925fc31b88c200f50209"],["bower_components/datetime-input/datetime-input-mixin.html","557c6d81be64dfac34f2634cbc91b018"],["bower_components/datetime-picker/calendar-element.html","a11e98fa5dfa777a880acd63c620fd51"],["bower_components/datetime-picker/date-picker.html","1f61eec54101355f7de68728a14d7504"],["bower_components/datetime-picker/datetime-polyfill-picker-mixin.html","462858607ed1cfde025ead9ef7b64fc1"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/g-element/indexed-db.html","f81b2d881cc1b17093b84c3c015521f8"],["bower_components/g-element/mongo-auth.html","8cac4d3c14ea05d2738591e54e475682"],["bower_components/input-picker-pattern/dropdown-style.html","1b1f702878f85ce30944800b01ea7ce0"],["bower_components/input-picker-pattern/dropdown-tip-style.html","3cc588a46f28d6593681d991e9fffa26"],["bower_components/input-picker-pattern/form-element-mixin.html","f946dd7b40bbdda8c038bc93a60456f4"],["bower_components/input-picker-pattern/input-pattern.html","d5067914378275c1013e9a36519248f7"],["bower_components/input-picker-pattern/input-picker-pattern.html","43f2b0cc43d612539bbd418589f3788e"],["bower_components/input-picker-pattern/input-picker-shared-style.html","bf54b34888867dde1123ef7b9fda1431"],["bower_components/input-picker-pattern/input-shared-style.html","f9b0fc0c85293bfc90198ebbe35df2bf"],["bower_components/input-picker-pattern/switch-container-mixin.html","f741ca59484b86161150f06955633d4d"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","1844b46b152179da8a8d2b8a8093f06c"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","7e459d599801c582676534c6d03a4b13"],["bower_components/iron-a11y-keys/iron-a11y-keys.html","642826d47ea827c603cd0b636e654bbc"],["bower_components/iron-ajax/iron-ajax.html","95fe5061f1c266ef372b644cf6b1bdc6"],["bower_components/iron-ajax/iron-request.html","1fff6b819b953124da400fc60b7a1dec"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","b3afd95d90d3d4b643bc4be24a2f7633"],["bower_components/iron-behaviors/iron-button-state.html","7f7f96935de5deaf9a51264225eb1a5a"],["bower_components/iron-behaviors/iron-control-state.html","eaae79d2363b0affadca35409acbba0a"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","9ce917fa978d3e488b33ef5183bc6631"],["bower_components/iron-collapse/iron-collapse.html","2b64aae42f66a091d2bba7cf25472166"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","48ae64b446d2f6b9a190e808e76e3caa"],["bower_components/iron-dropdown/iron-dropdown.html","0277dc387eb23aa4a4b5e97a2bd38d6e"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","825a08bd3c1d92b7d5c6428701ba404a"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["bower_components/iron-flex-layout/iron-flex-layout.html","79e7d437601a475cf9f69b16bbcb3b5a"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","721a4c39635bf62e28fa415fe03a6817"],["bower_components/iron-icon/iron-icon.html","0d81dc84af38dfdaa7eca375ab7a9b9e"],["bower_components/iron-icons/image-icons.html","0557d3f168befceb9c1cfdef5670aa9d"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","b9c649316ce30b30b93f5f96f75d0daf"],["bower_components/iron-image/iron-image.html","2c7dd007dfbf8aa1d759cac087063e6b"],["bower_components/iron-input/iron-input.html","d302ff15f3027f9bf2c01e883a27eaef"],["bower_components/iron-list/iron-list.html","52778ba0f749d4f088f3ffb9ec7cbcf9"],["bower_components/iron-location/iron-location.html","f1e26893eed8e71356aaef6d1bfff688"],["bower_components/iron-location/iron-query-params.html","2c09343d7e4d2dd3a8aafc22c15260f7"],["bower_components/iron-media-query/iron-media-query.html","0082aca119880bf33ce3ffd1fa0e9011"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","7744b8d275a22ea335c23e4db0012281"],["bower_components/iron-meta/iron-meta.html","2e07d1973f152e0b0ea984d98ad5a6ea"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","a2388bb1967df490e219522e00bb22da"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","cfe2e59dd31847faf1591e58d39441a8"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","438cfb1d7146dcf2e8709b518e3c4e01"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","aa2c1e525807c018b184c53833b18b72"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","7631ceddda661898b2f8f44a1c313914"],["bower_components/iron-pages/iron-pages.html","d983c12506f1633551ad7a45537b07e1"],["bower_components/iron-range-behavior/iron-range-behavior.html","562798494651ec5c2a47e7ef0e70d9de"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","5899231fe3cb7155effcd1ce6b71fb04"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","7eb3ce74be6aec4bdf251992e9c9a1e6"],["bower_components/iron-scroll-threshold/iron-scroll-threshold.html","5328e906dbb4b0ac60174e7d5b7d415f"],["bower_components/iron-selector/iron-multi-selectable.html","2e226f063dd99d8ecda93977d986176b"],["bower_components/iron-selector/iron-selectable.html","c07b54680e6b7cd953bf981a38495402"],["bower_components/iron-selector/iron-selection.html","19a051eb5d88baed09f6439512841bda"],["bower_components/iron-selector/iron-selector.html","76e80b0f3e145257b34de6fde1addd1a"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","15574530462b9f0c2ae512b078c596a2"],["bower_components/isw-dropdown-menu/isw-dropdown-menu.html","3df321edfdd893afabb94032521f3d93"],["bower_components/moment/min/moment-with-locales.min.js","5d2e033af11735376a3ce8bd02274e41"],["bower_components/moment/moment.js","c19e6d2a92bd90e80409b2057b25370e"],["bower_components/neon-animation/animations/cascaded-animation.html","538eb175b708ea0d050f8b270461b956"],["bower_components/neon-animation/animations/fade-in-animation.html","036c85fbf438281e2bc9efca073fdf48"],["bower_components/neon-animation/animations/fade-out-animation.html","834a2368655face5daff331858b56d46"],["bower_components/neon-animation/animations/hero-animation.html","9ae3be182e5d47a342cae0d168f7d0f3"],["bower_components/neon-animation/animations/opaque-animation.html","e531b364daf04cd24f0f085987dd900f"],["bower_components/neon-animation/animations/reverse-ripple-animation.html","757bb8a975fcab29f7020906b779979b"],["bower_components/neon-animation/animations/ripple-animation.html","67952b7fa2eaaa90ce9a530c19421b68"],["bower_components/neon-animation/animations/scale-down-animation.html","d5c2b1af888340304bed6e1fabe4db9b"],["bower_components/neon-animation/animations/scale-up-animation.html","4547496c1da1bfb8f805638a65252024"],["bower_components/neon-animation/animations/slide-down-animation.html","aff37c967372c72cea3d7b6a88ee9bb7"],["bower_components/neon-animation/animations/slide-from-bottom-animation.html","d0adfa13c6edd9b8b63d90cab6fd9bdb"],["bower_components/neon-animation/animations/slide-from-left-animation.html","3f5335d39c836a903703377e46869a0e"],["bower_components/neon-animation/animations/slide-from-right-animation.html","f38954288e87e29c2222c1545fd3c5c0"],["bower_components/neon-animation/animations/slide-from-top-animation.html","82135252c935454b1e648d0b9a127064"],["bower_components/neon-animation/animations/slide-left-animation.html","db5de1d508fc1a355d568469cc24a2d4"],["bower_components/neon-animation/animations/slide-right-animation.html","92858d308d051efb9cadf154238d19d1"],["bower_components/neon-animation/animations/slide-up-animation.html","4193f9aa898a9bf1a7d0880cbfa1306d"],["bower_components/neon-animation/animations/transform-animation.html","9a8c548bd0d41fdd1c9972c4411ebc66"],["bower_components/neon-animation/neon-animatable-behavior.html","ca326c00077a9ef323071b2fdab2abd9"],["bower_components/neon-animation/neon-animation-behavior.html","ecc870deadbf9d6d9134a3550eb10676"],["bower_components/neon-animation/neon-animation-runner-behavior.html","dc0200db2837a00660f518bf5f4fa3a6"],["bower_components/neon-animation/neon-animations.html","f88f2b5db3daeaba28072b501f5b8bff"],["bower_components/neon-animation/neon-shared-element-animation-behavior.html","88106cdd0f9c397066b7236551183193"],["bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["bower_components/number-input/integer-input.html","b9733f586e673274671a0c5d1db58fb0"],["bower_components/number-input/number-input.html","765a58dced670a764152f87189d8302d"],["bower_components/paper-badge/paper-badge.html","45b7e6af369a175bc5e793c089de8eb3"],["bower_components/paper-behaviors/paper-button-behavior.html","d3c9b2685f6e6585da6cf1e632c50574"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","6bacfe845e0be777b4ae80f02ff85115"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","52c2ca1ef155e8bca281d806fc9a8673"],["bower_components/paper-behaviors/paper-ripple-behavior.html","d865b73dbb028c24ed30c47da4a3e8fe"],["bower_components/paper-button-group/paper-button-group.html","570c4490840fe3fb4fc1647c27b89330"],["bower_components/paper-button/paper-button.html","3a7487ce185859f936789ce09890ca12"],["bower_components/paper-buttons-group/paper-buttons-group.html","9d2218e5fdbf2990a4e16f334672db27"],["bower_components/paper-card/paper-card.html","86feddb1aa52e5c01a980bd1c0ecc613"],["bower_components/paper-checkbox/paper-checkbox.html","21bdf252215333186db17a93e6cb6f92"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","c81f9bf9a0173da1dd5af3df073a25cc"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","5b97501e5b6ef42fa957487ea4c88e7e"],["bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html","6dbdf7b633a98273c971d15bda39bf11"],["bower_components/paper-dialog/paper-dialog.html","3cdf217af9197ada5462374abda382f2"],["bower_components/paper-dropdown-input/paper-dropdown-input.html","54413f52a8e566291f5aedc7f77d9d11"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["bower_components/paper-dropdown-menu/paper-dropdown-menu.html","70d34e1d4d4389d30526b14961d53eaf"],["bower_components/paper-dropdown/paper-dropdown-element-behavior.html","cadb5e398f53007134e16563f621eeb0"],["bower_components/paper-dropdown/paper-dropdown.html","d7f3c2edc4ec0e012b504d6213d499f9"],["bower_components/paper-fab/paper-fab.html","d2179fce15722c8defad314178fb03d7"],["bower_components/paper-icon-button/paper-icon-button.html","c3acafc40e7feb18eec57b7e49df808c"],["bower_components/paper-input/paper-input-addon-behavior.html","8338b9810655da62fbd0eb9ad047ec6b"],["bower_components/paper-input/paper-input-behavior.html","de57347c129164c34facff81cd48f54e"],["bower_components/paper-input/paper-input-char-counter.html","515307f96f8507f77b1246b6d17be658"],["bower_components/paper-input/paper-input-container.html","a2037f7acca099438d0196736ab3023e"],["bower_components/paper-input/paper-input-error.html","19103517e283f3c553437b1b82a5bcd2"],["bower_components/paper-input/paper-input.html","83f278c61a446549d5a8ee6e73ea87d2"],["bower_components/paper-input/paper-textarea.html","81421f4986ccd65b5271f9110dbcfb88"],["bower_components/paper-item/paper-icon-item.html","e5a5af273afb4448b9f84b3af3cefcd9"],["bower_components/paper-item/paper-item-behavior.html","ccdc3fce427156a1795b26da08a50d06"],["bower_components/paper-item/paper-item-body.html","3102c5ce7c1105b8dc8edfc41d1c4359"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-item/paper-item.html","39c2ca6ae589a156b08b88f6fd049e35"],["bower_components/paper-listbox/paper-listbox.html","93927bd9e8bbfa08b9d8b8e9d9b66ab8"],["bower_components/paper-material/paper-material-shared-styles.html","0880145bd868df7784d5cd49963468f6"],["bower_components/paper-material/paper-material.html","93846e9b646f5acc9e8e8c45eebb9031"],["bower_components/paper-menu-button/paper-menu-button-animations.html","fad624384b3dd4651692e3969e703d29"],["bower_components/paper-menu-button/paper-menu-button.html","2cea27ec5ff90ac5437d8546cca1dc3e"],["bower_components/paper-progress/paper-progress.html","b04d3e2fed5dcf1060fa9120078873fe"],["bower_components/paper-radio-button/paper-radio-button.html","0e0e852416983bbe83dbc39b6feacafc"],["bower_components/paper-ripple/paper-ripple.html","0c89f5d6aec27fa86d0a5422dae34099"],["bower_components/paper-spinner/paper-spinner-behavior.html","46ef5ac786242c29920edbff151343cd"],["bower_components/paper-spinner/paper-spinner-styles.html","f6b2d42a9d2262fafb034ea0f802fc80"],["bower_components/paper-spinner/paper-spinner.html","7de6bbcb534d5c959225338cda53073f"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/paper-styles.html","3a86674df8b40032fc42fe95649bbec6"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","195497070df39ff889ce243627cf6589"],["bower_components/paper-toast/paper-toast.html","7f30ebdad155bf8015b4679175f2b979"],["bower_components/paper-toggle-button/paper-toggle-button.html","50aa3711cb29dc7cab1a0b74600bbaa4"],["bower_components/polymer/lib/elements/array-selector.html","52e8ccf3909fdd0f9419e9774d2ca0a7"],["bower_components/polymer/lib/elements/custom-style.html","f40bf2a4b73a468b95ae479828a3dc5a"],["bower_components/polymer/lib/elements/dom-bind.html","0d93f7a399636f6cf6ebad294794304e"],["bower_components/polymer/lib/elements/dom-if.html","42bd24d5b4fb742b2e889bdaf7de0123"],["bower_components/polymer/lib/elements/dom-module.html","5da507765615f5c123d0efd6c0ee2b26"],["bower_components/polymer/lib/elements/dom-repeat.html","bcf3bf90e2e334f1916c24709e49fd80"],["bower_components/polymer/lib/legacy/class.html","4ba6bb406bd899376a4c9af525d92a77"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","e2acab6466374f35e893f01a420421d5"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","61308a9cc1b2cd07bdd49037c643f677"],["bower_components/polymer/lib/legacy/polymer-fn.html","4ecb6f82dd2003974ec5004dcb5644f0"],["bower_components/polymer/lib/legacy/polymer.dom.html","15df0f25c67326a90df9ff7ff3144048"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","5a2d1489b25cbcfc0ff535ed9c3b7652"],["bower_components/polymer/lib/mixins/dir-mixin.html","37c54da92010eb75da55564f2a0b6550"],["bower_components/polymer/lib/mixins/element-mixin.html","954ce5c4b7cde15960e14c6ecc0ed46f"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","38c200c539ed88933dbe5bbba675f9a4"],["bower_components/polymer/lib/mixins/mutable-data.html","7e8224680373279bc33abfe59a228870"],["bower_components/polymer/lib/mixins/properties-changed.html","ba0301f70a6367dc97078861f69ff85e"],["bower_components/polymer/lib/mixins/properties-mixin.html","fca3e9fb723b1e27b1a56e371a9cd7da"],["bower_components/polymer/lib/mixins/property-accessors.html","fc19ccd4fa69ec0804cb9ec1ac715459"],["bower_components/polymer/lib/mixins/property-effects.html","71e3e5d96e3ed81979f8c8995a0d9623"],["bower_components/polymer/lib/mixins/template-stamp.html","2eb71f1f90a4ddb27e31abb407d63363"],["bower_components/polymer/lib/utils/array-splice.html","ed2dff64e9ee2459f197c4b5dfa40d55"],["bower_components/polymer/lib/utils/async.html","e607ddc92613038687147318feba7a25"],["bower_components/polymer/lib/utils/boot.html","68172c225cc6ac34ebbcfcf5c69c2c5d"],["bower_components/polymer/lib/utils/case-map.html","3688b5ebabbe0f08a45d3041d15992d7"],["bower_components/polymer/lib/utils/debounce.html","15487e936eb37101e328bc4ea01733f7"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","d70a18e468cb1b856ab4e90a8b40c66a"],["bower_components/polymer/lib/utils/flush.html","816191b9a81240311f51d0a02ac54fbe"],["bower_components/polymer/lib/utils/gestures.html","0a3f30728ca0a80ee2f85fbd03a514cc"],["bower_components/polymer/lib/utils/html-tag.html","db4283ba6193df958b3d0c8fa54ed147"],["bower_components/polymer/lib/utils/import-href.html","d235b50f7364ad24853e388c0e47235a"],["bower_components/polymer/lib/utils/mixin.html","ca3a32aca09b6135bd17636d93b649cf"],["bower_components/polymer/lib/utils/path.html","5ce25fdab968f4c908a04b457059589d"],["bower_components/polymer/lib/utils/render-status.html","92d5cab79f72fe11c7dfe9f503f58e09"],["bower_components/polymer/lib/utils/resolve-url.html","17c2ea102916e990c83f1530fc8d7738"],["bower_components/polymer/lib/utils/settings.html","28ae919835cc82418c8bc46b00ba0eb0"],["bower_components/polymer/lib/utils/style-gather.html","02bd15f436201b2980ffeeddc5bb5b68"],["bower_components/polymer/lib/utils/templatize.html","0072099265edb10d4e6fe005e2b0850b"],["bower_components/polymer/lib/utils/unresolved.html","2ed3277470301933b1af10d413d8c614"],["bower_components/polymer/polymer-element.html","956b8c25342873f0d365e023fcd7c31a"],["bower_components/polymer/polymer.html","04fe0f988c84c96ecf449ca2381d122d"],["bower_components/property-mixins/datetime-mixin.html","2ee62d67c51a94b3b4aa6e0828d2b5e3"],["bower_components/property-mixins/intl-datetime-format-mixin.html","b32988c751b111dc2e66ad8855077f86"],["bower_components/property-mixins/intl-number-format-mixin.html","982e27c01da8dd0e3c4653bc5494dc61"],["bower_components/property-mixins/range-mixin.html","904fd606a5aa87c02416a5ded2160f13"],["bower_components/range-datepicker/moment-import.html","d313242087c22e7541cf7959438ff530"],["bower_components/range-datepicker/range-datepicker-behavior.html","c036db0dcde86ef851fe66d41a7b461d"],["bower_components/range-datepicker/range-datepicker-behavior.js","3a45f6d61073d3914a3fb3e056f8af24"],["bower_components/range-datepicker/range-datepicker-calendar.html","dd625b51064d13c113014e94188780d3"],["bower_components/range-datepicker/range-datepicker-calendar.js","078726dc1a64c7c106913334d42daa88"],["bower_components/range-datepicker/range-datepicker-cell.html","400d40077c72e81efc35c6ca62ec048b"],["bower_components/range-datepicker/range-datepicker-cell.js","d97fd0b3a98c981b5881128a6fa1550f"],["bower_components/range-datepicker/range-datepicker-input.html","37da9fba99f50af365bfdc73e2253895"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","ad97014a37cd52400df39226d3bd1ff3"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","e6e500c694cdd0063ebd830192261566"],["bower_components/short-unique-id/dist/short-unique-id.min.js","74865df674b5e3b70a6949869a35c4e1"],["bower_components/time-elements/time-elements.js","bc7386bfaed7a4b3748f4f940fdf6bf1"],["bower_components/web-animations-js/web-animations-next-lite.min.js","befa29858423272e72afd1711c999e0e"],["bower_components/webcomponentsjs/webcomponents-lite.js","baa84066e6ce5fc2c461ed4c240ae9f3"],["bower_components/webcomponentsjs/webcomponents-loader.js","596ad3dc06dfb78ecdc6bcee1d653f04"],["images/colorgreen.png","24aecce83c9548b25a689dcc68788906"],["images/colorred.png","77a38012fee966fa9e2ad8f7a1a6d9ea"],["images/coloryellow.png","df13b4d936400e9438d139ba554bfe89"],["images/cover.jpg","3a64d992ee0c00791466cdba896f57aa"],["images/favicon.ico","82b34d0faee76b89a9f946763428f668"],["images/lady.jpg","a29e3021b021ad1cc5ac9273df5516c2"],["images/pluspng.png","82e133292e315a2e84413aa84552f886"],["images/ptn.jpg","f3404fe5e5e536eec3a685ce3b23bf67"],["images/ptn1.png","441a2f6ded854d8eec0d526f6efcbc46"],["images/sakura.png","b84956f6d07cd6b6ef6e8de858a65dee"],["images/sakura2.png","cdaa5c1a103abaf02d44ddb10a5c18e4"],["images/user.png","3d2cf1f4f9b9c427cafba7ba57f35eba"],["index.html","53917e7957d8c9d6572d082318d5b160"],["manifest.json","1845171d3c4fe9ebe6a48852f4347b34"],["src/my-account-deactivated.html","0ec4df5147475ef8075fbd761193e382"],["src/my-account-setup.html","fd09167938a9bdd3e7eef4f8a36433a6"],["src/my-agentlist.html","67dcdc5cbcafeb02ffbe21ce45999c27"],["src/my-allocation-add.html","6fe70c6449cad0cbb8bb9d8996290bf5"],["src/my-allocation-edit.html","5969ef45d3b704e389051a796b2b2753"],["src/my-allocation-group.html","8f2113b43eabd155239cf17c45cf9443"],["src/my-allocation.html","3f2a19f2f9b499e17d2301f9b1cd262d"],["src/my-app.html","80637e710fc682af0d239dce76e75aea"],["src/my-availability-edit.html","9a71aaae679fdc0b63897240c14b5689"],["src/my-availability-new.html","3aff6160d7f8adff6338e9b67b364a35"],["src/my-availability.html","120d7871db014c3d5bb125c6c68bdeb7"],["src/my-blocking-add.html","a27a40b3c4385f671e867c9f5a453e67"],["src/my-blocking-agent.html","9c47d559cae9deb02411d3f635854875"],["src/my-blocking-edit.html","c8ae659526f5f97deec5aae41be289b4"],["src/my-blocking-hotel.html","e2cc5a1b24b0cfcfd96bd059b1d86974"],["src/my-blocking.html","1ba0e9c2dd0c203c8be52c905b3ecfab"],["src/my-booking-edit.html","8af2cc5a69d16cfce6c1b2b787ed1273"],["src/my-booking-new.html","8bade9a3e68030bc8c7c56be0c4bea2e"],["src/my-booking.html","901e7ef680c33ccf5195f24558df922d"],["src/my-edit-agent.html","945873dff01dabd4fda596ffb26c5423"],["src/my-edit-user.html","093199d4738b4d182917269e7d5f798b"],["src/my-group-edit.html","034d51fa4a8d605d3b66fce48e754399"],["src/my-group-new.html","225eb3b6fc5b229e38d2ecda9f326425"],["src/my-group.html","e17ecfadedefdc136a84ae1974a14cda"],["src/my-hotel-edit.html","f03d2613bab930a858d5275e5a5f9a1b"],["src/my-hotel-new.html","5849c8cce127dd5c992cc6bea4f36370"],["src/my-hotels.html","4de43997e6b4a0327e79ff096cb55df0"],["src/my-icons.html","5783ad828b70e6e0d3a59f5db3a4f87c"],["src/my-inquiry2.html","4be4238ee61b8df2bf8ff385dc766ba3"],["src/my-new-agent.html","a3c3504a140178121b4593fdcb5bc79f"],["src/my-new-user.html","c684825c7d64d7e7ad053374bfc4eae9"],["src/my-profile.html","e727143c518a4bdaaf6a2d8a7f67c17f"],["src/my-resetpw.html","fbc3dde920bbbdfac4f45699cc19613f"],["src/my-resetpwlink.html","d40d89e28c87a0d2a97192ab7a37b9e5"],["src/my-signin.html","0b80904807cfaedc1215647648c351ae"],["src/my-users.html","0952562b62d141c0debb9395d7f4cc42"],["src/my-view1.html","00b7d5cc2e2fcbd73f1a32a5b8093dd2"],["src/my-view2.html","2aaac1b4d39da381fa2a24b88ac730ea"],["src/my-view3.html","6404e5c3a1b53687ce668c459dfd984c"],["src/my-view404.html","97c82b4dbd0ac717ad3893874c7e465f"],["src/search-bar.html","ea0dd379045ef04990c31d8995a67cac"],["src/shared-styles.html","6377516341f13a95c973b3a17f4160d2"],["src/short-unique-id.html","fd47c9c1fdb1515bf04203e8149c7fba"],["src/time-element.html","8ab8a61866f9afd61ff316f03b07e0cc"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = '';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = 'index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["\\/[^\\/\\.]*(\\?|$)"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});


// *** Start of auto-included sw-toolbox code. ***
/* 
 Copyright 2016 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function(){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function(e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function(e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function(r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function(n){n.put(e,r).then(function(){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function(e){return g.setTimestampForUrl(e,o,a)}).then(function(e){return g.expireEntries(e,c,i,a)}).then(function(e){r("Successfully updated IDB.");var n=e.map(function(e){return t.delete(e)});return Promise.all(n).then(function(){r("Done with cache cleanup.")})}).catch(function(e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function(){return Promise.all([caches.open(e),caches.open(t)]).then(function(t){var n=t[0],r=t[1];return n.keys().then(function(e){return Promise.all(e.map(function(e){return n.match(e).then(function(t){return r.put(e,t)})}))}).then(function(){return caches.delete(e)})})})}function u(e,t){return o(t).then(function(t){return t.add(e)})}function f(e,t){return o(t).then(function(t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function(e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function(e,t,n){"use strict";function r(e){return new Promise(function(t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function(){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function(){t(r.result)},r.onerror=function(){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function(r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function(){r(e)},i.onabort=function(){o(i.error)}})}function c(e,t,n){return t?new Promise(function(r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function(e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function(){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function(n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function(){var e=a.result;e>t&&(s.openCursor().onsuccess=function(n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function(){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function(n){return s(e,t).then(function(e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function(e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function(e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function(e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function(t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function(e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function(e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function(e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function(e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function(e,r){t[e.name]=n[r+1]})}return function(e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function(e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function(e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function(){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function(e){s.prototype[e]=function(t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function(e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function(e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function(e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function(e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function(e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function(t){return t.match(e).then(function(e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function(r,c){var s=!1,a=[],u=function(e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function(e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function(e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function(e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function(t){var s,a,u=[];if(c){var f=new Promise(function(r){s=setTimeout(function(){t.match(e).then(function(e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function(e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function(r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function(e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function(e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function(e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function(e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function(n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function(e,t,n){!function(){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function(e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function(){if(arguments.length<1)throw new TypeError;return e=e.map(function(e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function(e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function(r){if(r.some(function(e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function(t,r){return n.put(e[r],t)}))}).then(function(){})},Cache.prototype.add=function(e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/bower_components\/webcomponentsjs\/.*.js/, toolbox.fastest, {"cache":{"name":"webcomponentsjs-polyfills-cache"}});




