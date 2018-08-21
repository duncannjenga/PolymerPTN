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

var precacheConfig = [["bower_components/app-layout/app-drawer-layout/app-drawer-layout.html","079d286761f1d091dbe8cafc76ce199a"],["bower_components/app-layout/app-drawer/app-drawer.html","39fc02164278d922f06a12a815aff142"],["bower_components/app-layout/app-header-layout/app-header-layout.html","fb94f4326d321cc284ab65273f3563c7"],["bower_components/app-layout/app-header/app-header.html","305ada3409999055fe3e37aa366efacb"],["bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","09bc22bdba053c05f0e478f37a7fcba6"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","1ee969ea308114897fbd8ec30875f38e"],["bower_components/app-layout/app-scroll-effects/app-scroll-effects.html","47ef4a1229fe38f7ebb0b846676908c9"],["bower_components/app-layout/app-scroll-effects/effects/blend-background.html","8851e2bc1d02cb787bb8ec121a8f86dd"],["bower_components/app-layout/app-scroll-effects/effects/fade-background.html","246c6867873a377de41329abc8ceee4f"],["bower_components/app-layout/app-scroll-effects/effects/material.html","7b79bae72b77d2510655c4d713960a0d"],["bower_components/app-layout/app-scroll-effects/effects/parallax-background.html","768c5ab949acf23970c8b6c439d97bb4"],["bower_components/app-layout/app-scroll-effects/effects/resize-snapped-title.html","6f34677105a5bb5083abaf30d17d9b06"],["bower_components/app-layout/app-scroll-effects/effects/resize-title.html","1491250febe3721d0b21778a69c34d5e"],["bower_components/app-layout/app-scroll-effects/effects/waterfall.html","8819a9e809201c5ba3d2d40403ede42a"],["bower_components/app-layout/app-toolbar/app-toolbar.html","cac42c92a39fd9611d080d1362905030"],["bower_components/app-layout/helpers/helpers.html","237274971e65a747a047e2687ff004a7"],["bower_components/app-route/app-location.html","bd5e056912b005b4a37253e14dc5a572"],["bower_components/app-route/app-route-converter-behavior.html","2476488d6a792c697533f1fc8fb8acd3"],["bower_components/app-route/app-route.html","82269d604404d0ecd468207b568d4be6"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","ee17e3fe42d649ecfbac67be6f78854d"],["bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","8042a13b030405e138fb9f2a099ba790"],["bower_components/app-storage/app-indexeddb-mirror/common-worker.html","b5648e089be77cf72421396f047c1e61"],["bower_components/app-storage/app-network-status-behavior.html","9235eec79ce62670e33d83c87d1fd823"],["bower_components/app-storage/app-storage-behavior.html","2662143b0ad7803477e55d6be7cc1440"],["bower_components/datetime-input/date-input.html","6fd3a147b81bb40184f69529ff2dde03"],["bower_components/datetime-input/datetime-input-mixin.html","2615d31c89fabb01d0d0738697f35987"],["bower_components/datetime-picker/calendar-element.html","68d16cfac66619fcb7afef4c89645a76"],["bower_components/datetime-picker/date-picker.html","f9cad7094709d40ee3ca663879825e5a"],["bower_components/datetime-picker/datetime-polyfill-picker-mixin.html","20d3dd257980f8858c3c023bb30e79f8"],["bower_components/file-input/file-input.html","c9597645f9985b015ce7292aea505f78"],["bower_components/file-input/file-input.js","741a3f469f57961a16c08fa1a48bbf10"],["bower_components/font-roboto/roboto.html","3dd603efe9524a774943ee9bf2f51532"],["bower_components/g-element/indexed-db.html","8c4b01ce39ff986db33d33a42605a1ff"],["bower_components/g-element/mongo-auth.html","b77aad2a73aea5469e08acc257745020"],["bower_components/input-picker-pattern/dropdown-style.html","1b1f702878f85ce30944800b01ea7ce0"],["bower_components/input-picker-pattern/dropdown-tip-style.html","3cc588a46f28d6593681d991e9fffa26"],["bower_components/input-picker-pattern/form-element-mixin.html","b7a1bbe64769a27ae39b1d2c01f47849"],["bower_components/input-picker-pattern/input-pattern.html","e7c744152b6a76d43373d456ca370e90"],["bower_components/input-picker-pattern/input-picker-pattern.html","d59af541450d6cda0c83227f560763f5"],["bower_components/input-picker-pattern/input-picker-shared-style.html","bf54b34888867dde1123ef7b9fda1431"],["bower_components/input-picker-pattern/input-shared-style.html","f9b0fc0c85293bfc90198ebbe35df2bf"],["bower_components/input-picker-pattern/switch-container-mixin.html","81b3458923b2bfd2dfc046ead35c231e"],["bower_components/iron-a11y-announcer/iron-a11y-announcer.html","3891d462c464862c5706e114e1abe93b"],["bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","de57201642e8aa7eadebad45ca7b35e7"],["bower_components/iron-ajax/iron-ajax.html","0e549efa574d0bdda759893a51390e00"],["bower_components/iron-ajax/iron-request.html","08b1c759435db3caa2b9378ccd686e39"],["bower_components/iron-autogrow-textarea/iron-autogrow-textarea.html","638755357b2232fec7d98c6d8cdab219"],["bower_components/iron-behaviors/iron-button-state.html","2034e45c1e5117b83033713cda6a0b4f"],["bower_components/iron-behaviors/iron-control-state.html","d57c6bfd619425b963c65c312a054ab2"],["bower_components/iron-checked-element-behavior/iron-checked-element-behavior.html","0e28003f171922990b2a8ea1ccb9d130"],["bower_components/iron-collapse/iron-collapse.html","63b719b884fd407b6a7e12d152d99117"],["bower_components/iron-dropdown/iron-dropdown-scroll-manager.html","2c130887355bcec6b7b2ebe193f545ab"],["bower_components/iron-dropdown/iron-dropdown.html","c52449e0659595ee29d557741b24f4f4"],["bower_components/iron-fit-behavior/iron-fit-behavior.html","b18754371211a8c6017ec2ee0f1ebea1"],["bower_components/iron-flex-layout/iron-flex-layout-classes.html","7fdc2ab3c7921949621e8374a86e2af4"],["bower_components/iron-flex-layout/iron-flex-layout.html","40fbf9b980a269b5507022f32f9b413c"],["bower_components/iron-form-element-behavior/iron-form-element-behavior.html","b7b67529241d4996945b71a1c09f01b0"],["bower_components/iron-icon/iron-icon.html","86e2b60880947c0b39494a73411fbc11"],["bower_components/iron-icons/image-icons.html","0557d3f168befceb9c1cfdef5670aa9d"],["bower_components/iron-icons/iron-icons.html","f167b940536136378cba6ddbc6bb00d0"],["bower_components/iron-iconset-svg/iron-iconset-svg.html","84a7393de41f8ea5da7a599f480b57f0"],["bower_components/iron-image/iron-image.html","0367b237486a99f74bf5ee140e95b3c8"],["bower_components/iron-input/iron-input.html","40bb4bbc62b07540ba593d2cf74e7dca"],["bower_components/iron-list/iron-list.html","1b6a2a6c81312866e27c85cfb43bcba4"],["bower_components/iron-location/iron-location.html","246e9e57c65edac20efdf755c7f58aa5"],["bower_components/iron-location/iron-query-params.html","68baaf760be6d810068b26c83f8e66ca"],["bower_components/iron-media-query/iron-media-query.html","07eb0b58f4e004bb03453c9b8a673664"],["bower_components/iron-menu-behavior/iron-menu-behavior.html","bb8aada82d13df5b839923fc817484b2"],["bower_components/iron-menu-behavior/iron-menubar-behavior.html","e86b1a7fd638275ca05880ca0f6aa3eb"],["bower_components/iron-meta/iron-meta.html","d3401c6909ebd2a7da37f6bf5fae988b"],["bower_components/iron-overlay-behavior/iron-focusables-helper.html","340b583bc8f50cf5817490e60ca60939"],["bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","05cc5c4d1abbf2d55d73d9b102013191"],["bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2c99ff1debbe68090624b1a52f3f4a50"],["bower_components/iron-overlay-behavior/iron-overlay-manager.html","5902d04f185d2dc6291e0705a7b24725"],["bower_components/iron-overlay-behavior/iron-scroll-manager.html","b824f23f960fad504b5b9562dbd68570"],["bower_components/iron-pages/iron-pages.html","461dc38467532f0a57bf564301bcca78"],["bower_components/iron-range-behavior/iron-range-behavior.html","9f526032f3c5f23f172b1285fc509709"],["bower_components/iron-resizable-behavior/iron-resizable-behavior.html","5eaa8354f13c3334cfdd1438089dd429"],["bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","8601c5c220d208435e3685dfdc063e2e"],["bower_components/iron-scroll-threshold/iron-scroll-threshold.html","f241c971062393e724d49caa3f8c2ff3"],["bower_components/iron-selector/iron-multi-selectable.html","802945ddfc16eb03e8b605fff57cebb9"],["bower_components/iron-selector/iron-selectable.html","b9248a704cc4895f7ecbccff8efd0edf"],["bower_components/iron-selector/iron-selection.html","30b5a0f391d92c70156b1830fb3bd0c6"],["bower_components/iron-selector/iron-selector.html","b16e67c27ef856b12149a467cc5223b0"],["bower_components/iron-validatable-behavior/iron-validatable-behavior.html","7baac7bb9d9812449b62290a46f070d7"],["bower_components/moment/min/moment-with-locales.min.js","75d98c82e4d545392d6f90521e89414e"],["bower_components/moment/moment.js","5b25b45d9022e5a271df7b0091a344b6"],["bower_components/neon-animation/animations/cascaded-animation.html","5906465e56e18d3e69757d96f104210e"],["bower_components/neon-animation/animations/fade-in-animation.html","749c9d1d5b5f4f27d687fc197309a5c5"],["bower_components/neon-animation/animations/fade-out-animation.html","d68aac80ac6bc94606e236f5eaa405ef"],["bower_components/neon-animation/animations/hero-animation.html","ea3ea45ae30d6e1dadcb545b4b08612b"],["bower_components/neon-animation/animations/opaque-animation.html","f3506a36f5700977b72e9d8d57382c1c"],["bower_components/neon-animation/animations/reverse-ripple-animation.html","7ca46615db958fe2ac3b88d7c9c82b48"],["bower_components/neon-animation/animations/ripple-animation.html","e2fb1cde09f02ab38dfdeb239735a1c0"],["bower_components/neon-animation/animations/scale-down-animation.html","c220e148b6ed78cb6ac20a7badec1935"],["bower_components/neon-animation/animations/scale-up-animation.html","26ce23099e9b81ad31d3991d677badb6"],["bower_components/neon-animation/animations/slide-down-animation.html","e72c4065ce235fdf07031bd2618e9cc4"],["bower_components/neon-animation/animations/slide-from-bottom-animation.html","970a4422573d95502af3132fddc46fad"],["bower_components/neon-animation/animations/slide-from-left-animation.html","aaa7dfd47066faa9a4ef0e162d1f7be7"],["bower_components/neon-animation/animations/slide-from-right-animation.html","293d4610b5d0053dab202df6fd28c183"],["bower_components/neon-animation/animations/slide-from-top-animation.html","16428b85625b9a67de4562eeb5748caa"],["bower_components/neon-animation/animations/slide-left-animation.html","ab1e6b103b4c5e9bcd94df02e4bd45af"],["bower_components/neon-animation/animations/slide-right-animation.html","0fd00dc98a9abcf3640614a1ad8dd0fd"],["bower_components/neon-animation/animations/slide-up-animation.html","f94e2e11833e73e8423f7f4b0fdc71f2"],["bower_components/neon-animation/animations/transform-animation.html","6e91f774d100448c3089f39b0eb1abb4"],["bower_components/neon-animation/neon-animatable-behavior.html","110532d0bd679a9fffce01d4085f741d"],["bower_components/neon-animation/neon-animation-behavior.html","7851a2111778abe5f869bb6e1584b20b"],["bower_components/neon-animation/neon-animation-runner-behavior.html","0da4f61f6a232924d2871fe580f1f355"],["bower_components/neon-animation/neon-animations.html","f88f2b5db3daeaba28072b501f5b8bff"],["bower_components/neon-animation/neon-shared-element-animation-behavior.html","02eccdfecf4f7e1126bdcfc9b161cce8"],["bower_components/neon-animation/web-animations.html","aa5266664b17a9a7d7ebf0c4e6fcf8c9"],["bower_components/number-input/integer-input.html","04f7bca371bc112160bc1fc17c541b2e"],["bower_components/number-input/number-input.html","bfd1a44001962bf0fd6d17f2ae4ec968"],["bower_components/paper-badge/paper-badge.html","1628613041a9b9946aaf8b57f7c9ea15"],["bower_components/paper-behaviors/paper-button-behavior.html","ba4f655d100442d73343d6e4f60aa358"],["bower_components/paper-behaviors/paper-checked-element-behavior.html","377ef379e22b072ffcd6374c63b90d62"],["bower_components/paper-behaviors/paper-inky-focus-behavior.html","3b088afa4531829d1a5b79d3bf5978f1"],["bower_components/paper-behaviors/paper-ripple-behavior.html","574608962bf3eb67383391cf8513d56b"],["bower_components/paper-button-group/paper-button-group.html","ead849f0178efc0b8dfb7675a1729b3f"],["bower_components/paper-button/paper-button.html","b0c95dacbbf7e1ce20ea182911dcbd34"],["bower_components/paper-buttons-group/paper-buttons-group.html","1efdca6ce2faf487d1eedd878ea2221c"],["bower_components/paper-card/paper-card.html","e94cf5d1a1eafd3607db65b791a724aa"],["bower_components/paper-checkbox/paper-checkbox.html","c59f48813759864a7e8d4e84510db3ce"],["bower_components/paper-dialog-behavior/paper-dialog-behavior.html","a7a38d677669138125627b5f26c7253f"],["bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","5b97501e5b6ef42fa957487ea4c88e7e"],["bower_components/paper-dialog-scrollable/paper-dialog-scrollable.html","d51641cd7577076f32ddd5884cbd26ac"],["bower_components/paper-dialog/paper-dialog.html","dbc40043361685fe33f5a64c5a001d66"],["bower_components/paper-dropdown-input/paper-dropdown-input.html","dd461bf9bbaf250315d38208347533f9"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-icons.html","bd8d99e625c1baab3431ae830d788c72"],["bower_components/paper-dropdown-menu/paper-dropdown-menu-shared-styles.html","62226dde51d0f26f0ccab279cfb89b58"],["bower_components/paper-dropdown-menu/paper-dropdown-menu.html","b36dd99a9ef58d3f83729bcff741482a"],["bower_components/paper-dropdown/paper-dropdown-element-behavior.html","b0fb1b4a733bc6fcf45c849116176c3d"],["bower_components/paper-dropdown/paper-dropdown.html","9fdbebe4a921c430dff3db7e774d82e5"],["bower_components/paper-fab/paper-fab.html","626537344874797f4b33056874942b30"],["bower_components/paper-icon-button/paper-icon-button.html","a557e2789045f5c41da9befed2f6350c"],["bower_components/paper-input/paper-input-addon-behavior.html","2fc92460e7bae448bb21b4a896d98f07"],["bower_components/paper-input/paper-input-behavior.html","2477bf1b481a0c0846f045e98cf35ef4"],["bower_components/paper-input/paper-input-char-counter.html","3ae922107097dd92f27ca6833e346694"],["bower_components/paper-input/paper-input-container.html","456a5ceaf85fd9141c0df41c7a617aa6"],["bower_components/paper-input/paper-input-error.html","bc4f6ffdc9de51776c7240e05dbed3a1"],["bower_components/paper-input/paper-input.html","91a9206dde88d0826e29dc6cf1224f3e"],["bower_components/paper-input/paper-textarea.html","39570e653b57569a0d736115a9e5dca0"],["bower_components/paper-item/paper-icon-item.html","e5a84379c6c88dcda71319862231c1da"],["bower_components/paper-item/paper-item-behavior.html","fe3b93f23bb620f4abcb1fa3b8cb0c48"],["bower_components/paper-item/paper-item-body.html","53903cc740e470a5f0661869d89d2f8f"],["bower_components/paper-item/paper-item-shared-styles.html","b5104778f1e5f558777d7558623493db"],["bower_components/paper-item/paper-item.html","bbcea6a06ad2e50f9d46e45adbe58514"],["bower_components/paper-listbox/paper-listbox.html","d33a53b16db2af1e3f40dbcb4116217f"],["bower_components/paper-material/paper-material-shared-styles.html","0880145bd868df7784d5cd49963468f6"],["bower_components/paper-material/paper-material.html","b37f0cb5775746f2443f4c82101fb958"],["bower_components/paper-menu-button/paper-menu-button-animations.html","5d24a43a8fd4c3c1b3a0a1b1fbf106a6"],["bower_components/paper-menu-button/paper-menu-button.html","c097e3240bee3dc2f69763f36d916887"],["bower_components/paper-progress/paper-progress.html","1885e0ba9b8a1cf52c1a903456396346"],["bower_components/paper-radio-button/paper-radio-button.html","0fda5b08994b26fe158a519d53de8e32"],["bower_components/paper-ripple/paper-ripple.html","b4cc3ee650f23101e9a4a0be44968a1a"],["bower_components/paper-spinner/paper-spinner-behavior.html","8685ad432fbded77b263aad4a91034e5"],["bower_components/paper-spinner/paper-spinner-styles.html","f6b2d42a9d2262fafb034ea0f802fc80"],["bower_components/paper-spinner/paper-spinner.html","acff8d1e71eaac17569976125462ff67"],["bower_components/paper-styles/color.html","549925227bc04f9c17b52e2e35cd2e26"],["bower_components/paper-styles/default-theme.html","5357609d26772a270098c0e3ebb1bb98"],["bower_components/paper-styles/element-styles/paper-material-styles.html","8d8d619e6f98be2c5d7e49ca022e423c"],["bower_components/paper-styles/shadow.html","1f23a65a20ed44812df26a9c16468e3f"],["bower_components/paper-styles/typography.html","c9e19299c83b2089cd56b08cbe3c0998"],["bower_components/paper-toast/paper-toast.html","44750c607be8c6e4e4f9f0560764092a"],["bower_components/paper-toggle-button/paper-toggle-button.html","4ee5c9cf423246fd033d2617592748fc"],["bower_components/pf-calendar-events-data/pf-calendar-events-data.html","eaa914aa0cc70bcd941bd3a056511583"],["bower_components/pf-calendar-events/js/moment.min.js","a59ad3014ab90b71babc4322317db734"],["bower_components/pf-calendar-events/pf-calendar-events.html","1be81affb97aff6fdae4e91719e25d6a"],["bower_components/pf-calendar/js/moment.min.js","a59ad3014ab90b71babc4322317db734"],["bower_components/pf-calendar/pf-calendar.html","573f1f3916c9580f76e596f557261a29"],["bower_components/polymer/lib/elements/array-selector.html","841dc72edc195009030cac467dcaccad"],["bower_components/polymer/lib/elements/custom-style.html","08afb86580116b7e4d39d43a39cd1d08"],["bower_components/polymer/lib/elements/dom-bind.html","41004de9dca438cb73383a94fe646d1f"],["bower_components/polymer/lib/elements/dom-if.html","c1fc3b3b3ddd0989b627cb0bfc520cb6"],["bower_components/polymer/lib/elements/dom-module.html","51f4c371c9410959c3feca850c742712"],["bower_components/polymer/lib/elements/dom-repeat.html","8ea3b0cf97eb7232f5f9a561d36115b3"],["bower_components/polymer/lib/legacy/class.html","72a154ebb7232938bdc65e94b13d7508"],["bower_components/polymer/lib/legacy/legacy-element-mixin.html","7b796531a0b47ac74059df0ada681333"],["bower_components/polymer/lib/legacy/mutable-data-behavior.html","727424c73ce82a221dd5d55dae8bfb7e"],["bower_components/polymer/lib/legacy/polymer-fn.html","80b9a95b6f9627267b498fae324c8aec"],["bower_components/polymer/lib/legacy/polymer.dom.html","44aedb235eec8a562cb3ad63bb1033ee"],["bower_components/polymer/lib/legacy/templatizer-behavior.html","e259e4210ec65f4c25459720ce7b71b0"],["bower_components/polymer/lib/mixins/dir-mixin.html","db536a9ada8cdc0fb2fc010e59fbc5e5"],["bower_components/polymer/lib/mixins/element-mixin.html","a2607ad7b0e6e857edf8bb438dbd8030"],["bower_components/polymer/lib/mixins/gesture-event-listeners.html","11c9f3ad714623f52dea07e6afaa2b30"],["bower_components/polymer/lib/mixins/mutable-data.html","0c86e6cf2ad4f58a247cbb4e3b8fe365"],["bower_components/polymer/lib/mixins/properties-changed.html","941485133606f5066c9d713748ca896f"],["bower_components/polymer/lib/mixins/properties-mixin.html","b89faebafe8686dffaeb79a3abc83162"],["bower_components/polymer/lib/mixins/property-accessors.html","7287eb3f0383d7e8da9a3b18e569ed7e"],["bower_components/polymer/lib/mixins/property-effects.html","3f82d74daf72dbfaa8a652e42751c8af"],["bower_components/polymer/lib/mixins/template-stamp.html","30a841e5dc48ec28ae2ec04c071c6205"],["bower_components/polymer/lib/utils/array-splice.html","02e37f7a718cb6724e4c1101fd9fe693"],["bower_components/polymer/lib/utils/async.html","2f5b326d88e8030cd26781095235fd6c"],["bower_components/polymer/lib/utils/boot.html","b60843623cc8cb524686f5c9c77b77e0"],["bower_components/polymer/lib/utils/case-map.html","3348b08018d83d39a4447a6bbaa896af"],["bower_components/polymer/lib/utils/debounce.html","bdb9a2e69ead51e6b8bf27583d040e27"],["bower_components/polymer/lib/utils/flattened-nodes-observer.html","0e34b65431c3aca1e492f459f0f64623"],["bower_components/polymer/lib/utils/flush.html","02cf15aa4ad4cc7edc87d6c5724d2c0f"],["bower_components/polymer/lib/utils/gestures.html","23630718c66b674e8cd0cfd942b2b653"],["bower_components/polymer/lib/utils/html-tag.html","95f4ef70c3d2d142f390a98470c194b4"],["bower_components/polymer/lib/utils/import-href.html","d6093e9c471580c1cb35f7686c772fde"],["bower_components/polymer/lib/utils/mixin.html","5ec7b79aa4871070458783ac7c2980a9"],["bower_components/polymer/lib/utils/path.html","279780f8fac6e7f4048f3895f7a05fda"],["bower_components/polymer/lib/utils/render-status.html","c14138dff3da4d203b9bdca9bd93b929"],["bower_components/polymer/lib/utils/resolve-url.html","5bc2e90748b9845386f19a1eee5d1191"],["bower_components/polymer/lib/utils/settings.html","4f688f5909f8493a10a5012176c911cc"],["bower_components/polymer/lib/utils/style-gather.html","1e10e8f6f06cf5d4f976e3fd905f1252"],["bower_components/polymer/lib/utils/templatize.html","8c31c01b8471caf635004e0ca99a27b1"],["bower_components/polymer/lib/utils/unresolved.html","50b8ec3ab60b6b40f4cf4fc931027b80"],["bower_components/polymer/polymer-element.html","26c3b3b8ee7b81243474c7d95636d157"],["bower_components/polymer/polymer.html","72d557b84da0412316b422d8325ad25c"],["bower_components/property-mixins/datetime-mixin.html","fec4b9c5d72bb79f0e0312e5707bbe08"],["bower_components/property-mixins/intl-datetime-format-mixin.html","6ee6395659952c8b5225efe4fb594c41"],["bower_components/property-mixins/intl-number-format-mixin.html","41f5dfc650331eee33ed8fb4175997fc"],["bower_components/property-mixins/range-mixin.html","bf71ff3579a87584b046df51a1298c39"],["bower_components/range-datepicker/moment-import.html","d313242087c22e7541cf7959438ff530"],["bower_components/range-datepicker/range-datepicker-behavior.html","c036db0dcde86ef851fe66d41a7b461d"],["bower_components/range-datepicker/range-datepicker-behavior.js","d4d84c772a14024859b28c857e576ee6"],["bower_components/range-datepicker/range-datepicker-calendar.html","dd625b51064d13c113014e94188780d3"],["bower_components/range-datepicker/range-datepicker-calendar.js","7cec4d5e284817b08d78397e48658245"],["bower_components/range-datepicker/range-datepicker-cell.html","400d40077c72e81efc35c6ca62ec048b"],["bower_components/range-datepicker/range-datepicker-cell.js","38450fb338c19af49796b356f3526683"],["bower_components/range-datepicker/range-datepicker-input.html","aca831c0852b23ff6ada7b5b4971ac09"],["bower_components/salte-dialog/salte-dialog-shared-styles.html","4df9e59cdbea3c6e5989576972e8410a"],["bower_components/salte-dialog/salte-dialog.html","d8f01d86366b22068869e815960e83c5"],["bower_components/shadycss/apply-shim.html","5b73ef5bfcac4955f6c24f55ea322eb1"],["bower_components/shadycss/apply-shim.min.js","e1adb71a5f681fab6f137f8ddd60d745"],["bower_components/shadycss/custom-style-interface.html","7e28230b85cdcc2488e87172c3395d52"],["bower_components/shadycss/custom-style-interface.min.js","72c0678c9e5acee7852cd040f59a214e"],["bower_components/short-unique-id/dist/short-unique-id.min.js","552d4d90e1b51ee4df8af9ae76886710"],["bower_components/time-elements/time-elements.js","486bd435f658a7eaf824733879418959"],["bower_components/vaadin-checkbox/src/vaadin-checkbox.html","409a70e985775b1b35be932bb4d57243"],["bower_components/vaadin-checkbox/theme/lumo/vaadin-checkbox.html","a0eb79214424b285d8960d3d75bed2a9"],["bower_components/vaadin-combo-box/src/vaadin-combo-box-mixin.html","b98e0faee99b17a5e27a33da8c14f9c2"],["bower_components/vaadin-combo-box/src/vaadin-combo-box.html","ab3de3c6bb86ee74a2032ae202dd2f64"],["bower_components/vaadin-combo-box/theme/lumo/vaadin-combo-box.html","8747561a93a2435459fd2f1c9c00a60b"],["bower_components/vaadin-combo-box/vaadin-combo-box.html","be3b86fdf3d278bad454614b01c23b05"],["bower_components/vaadin-control-state-mixin/vaadin-control-state-mixin.html","f662507f9598b5a72487f62d35c8be07"],["bower_components/vaadin-development-mode-detector/vaadin-development-mode-detector.html","ed157558801f018d805b28183e432cba"],["bower_components/vaadin-dialog/src/vaadin-dialog.html","ca505fc01b4ebb0a37bf9a6c16364baf"],["bower_components/vaadin-dialog/theme/lumo/vaadin-dialog.html","19b0456bec535e041d4326c6b9ff2bde"],["bower_components/vaadin-dialog/vaadin-dialog.html","43a551835018e09bf425d01b81bb35ae"],["bower_components/vaadin-dropdown-menu/src/vaadin-dropdown-menu.html","77be5db4e19a3b305a70df6f861c08b4"],["bower_components/vaadin-dropdown-menu/theme/lumo/vaadin-dropdown-menu.html","46729423573f5def0da2d49c259d90bf"],["bower_components/vaadin-dropdown-menu/vaadin-dropdown-menu.html","ef7a6889140da1cc302c2ff74959ba2a"],["bower_components/vaadin-element-mixin/vaadin-element-mixin.html","f350d4d4acefe4d7922d299344bde2a1"],["bower_components/vaadin-grid/src/iron-list.html","b5aee2006e4e01a24d17b299f76466cc"],["bower_components/vaadin-grid/src/vaadin-grid-column-reordering-mixin.html","1f14a362607581a5732dd32c705cd70e"],["bower_components/vaadin-grid/src/vaadin-grid-column.html","3254c86183738c9141bb8594fda00f93"],["bower_components/vaadin-grid/src/vaadin-grid-data-provider-mixin.html","994e9a284699805f40c2be8cfb4feeb1"],["bower_components/vaadin-grid/src/vaadin-grid-keyboard-navigation-mixin.html","bc66eedea3d78c57baf8b85a02130980"],["bower_components/vaadin-grid/src/vaadin-grid-outer-scroller.html","4c37de2278f567b40a42a46abf65b742"],["bower_components/vaadin-grid/src/vaadin-grid-scroll-mixin.html","72f054187338b4436875f757f13e1906"],["bower_components/vaadin-grid/src/vaadin-grid-scroller.html","7816084fee5f67497ea4145a3989419f"],["bower_components/vaadin-grid/src/vaadin-grid-styles.html","3460d660341278b553f0dca7b1cf4468"],["bower_components/vaadin-grid/src/vaadin-grid-templatizer.html","794a0d520895cc198880b6397987305a"],["bower_components/vaadin-grid/src/vaadin-grid.html","3db4b15d8002193dc7846572840ab024"],["bower_components/vaadin-grid/theme/lumo/vaadin-grid.html","b1c549593a0c0be1b944405bfb672539"],["bower_components/vaadin-grid/vaadin-grid.html","b8c2e92f91cf6e789f757c3efad978fd"],["bower_components/vaadin-item/src/vaadin-item-mixin.html","d2129a83aa7cf0d7234b4bf6a0d9f489"],["bower_components/vaadin-item/src/vaadin-item.html","1de0e26b9119cb85804ff63479d209ef"],["bower_components/vaadin-item/theme/lumo/vaadin-item.html","d893f24d5cdb585a970de71fa10a6f87"],["bower_components/vaadin-item/vaadin-item.html","ffbef6289c2af594a2c5afb6dcbd92f3"],["bower_components/vaadin-list-box/src/vaadin-list-box.html","2240beec68fe0b43f557215bb41aa1ce"],["bower_components/vaadin-list-box/theme/lumo/vaadin-list-box.html","84bdfbefa4e96fb15bbeec1d3d8544e2"],["bower_components/vaadin-list-box/vaadin-list-box.html","e26cb4e0216ff796aad56170ae18ff31"],["bower_components/vaadin-list-mixin/vaadin-list-mixin.html","6211dcdcdb002e05f5a02a9329a70c93"],["bower_components/vaadin-lumo-styles/color.html","c9cc1552f5c2017cf1a68e3cfb3800c9"],["bower_components/vaadin-lumo-styles/font-icons.html","dd9ab894fcb060ab3ff1cb64d8c8b54b"],["bower_components/vaadin-lumo-styles/icons.html","b7c497c714b6de3eaddaa23f1062c826"],["bower_components/vaadin-lumo-styles/mixins/field-button.html","6228720ce546360d4204b89001e3bb33"],["bower_components/vaadin-lumo-styles/mixins/menu-overlay.html","17a3894f589beea8081c783748aa1dc8"],["bower_components/vaadin-lumo-styles/mixins/overlay.html","a96b09583ed46ca5eaff2d330728805c"],["bower_components/vaadin-lumo-styles/sizing.html","25ad9e9a8800d45087fd9be497606751"],["bower_components/vaadin-lumo-styles/spacing.html","83d43c70cb2c7cc5214b8b2c32c0a8a0"],["bower_components/vaadin-lumo-styles/style.html","bb0cafcf0c2fc5d5a5b3de32ea017429"],["bower_components/vaadin-lumo-styles/typography.html","47cb1b8195cd9a48a7913d219c26237a"],["bower_components/vaadin-lumo-styles/version.html","a921157aeb945f49db639d3e582e1333"],["bower_components/vaadin-notification/src/vaadin-notification.html","5e2b741e51e4afd7530e5fc64fc7c018"],["bower_components/vaadin-notification/theme/lumo/vaadin-notification.html","5e9e6813e39aec49de9b1d76c6de267d"],["bower_components/vaadin-notification/vaadin-notification.html","995c15785f93777f6e9290f86cab5d30"],["bower_components/vaadin-overlay/src/vaadin-overlay.html","190a6cfda6573e6ecb5605e3975dd305"],["bower_components/vaadin-overlay/theme/lumo/vaadin-overlay.html","585c2c9a617687b9a983fbf90784d504"],["bower_components/vaadin-text-field/src/vaadin-text-field-mixin.html","812898f0142ff24261e9cd087d6383d6"],["bower_components/vaadin-text-field/src/vaadin-text-field.html","e6534636c37fa91c38d800499af2ac69"],["bower_components/vaadin-text-field/theme/lumo/vaadin-text-field.html","6ece79de8511938a8a2a665f32c079fc"],["bower_components/vaadin-text-field/vaadin-text-field.html","625d1d52ce7f5d77c7f8608c349fd924"],["bower_components/vaadin-themable-mixin/vaadin-themable-mixin.html","2e9ad167690cb0fc84c5528761c64620"],["bower_components/web-animations-js/web-animations-next-lite.min.js","6579d2914a8920d46d8cc74a3cff3dec"],["bower_components/webcomponentsjs/webcomponents-lite.js","7fdc028421fa02f2967574f904d42269"],["bower_components/webcomponentsjs/webcomponents-loader.js","596ad3dc06dfb78ecdc6bcee1d653f04"],["index.html","6f6f4a821730ddf2030b1a66ce5e6ea7"],["manifest.json","1845171d3c4fe9ebe6a48852f4347b34"],["src/my-account-deactivated.html","06c33810a41612f244d95a5e23a4e9a3"],["src/my-account-setup.html","cfc7e5cc900e1ab68bcc6bb48f2394fd"],["src/my-agentlist.html","3b0b0279f9b3f99e953472b88b7589e3"],["src/my-allocation-add.html","54cda60179d7daafbc39bff8b9b65f66"],["src/my-allocation-edit.html","956190cb601523afc39319aa53115e52"],["src/my-allocation-group.html","65b8f329b6d8c4233020767c3a26226d"],["src/my-allocation.html","1dc9359609bd74b865eea5d1ee13a6e3"],["src/my-app.html","eb186683474b9e9f2ace1f1e7c6d17ab"],["src/my-availability-edit.html","31571e5eb2e88d2b13e20bbeda7115f4"],["src/my-availability-new.html","38965e86dfd85aeafe0aec3c530322e6"],["src/my-availability.html","1d7d4e0932e435a3e74588a0ec6df243"],["src/my-blocking-add.html","bec804ab5871225520adc9d61169ed01"],["src/my-blocking-agent.html","8007db6abb8b1bc8da658fd2ff02f6b4"],["src/my-blocking-edit.html","88d971799f1ab290d91529a8b150eff1"],["src/my-blocking-hotel.html","913e24a6c0df83af8c8f84b60e8b7197"],["src/my-blocking.html","44ae485ee8c027ef71477c13bba46c82"],["src/my-booking-edit.html","cedfb745605bb5d2e3c32c9d8e7c1dbf"],["src/my-booking-new.html","632fa43c578b7415b1544f246277c2f8"],["src/my-booking.html","17d20c16b3840490ce8bf32e5eb422fc"],["src/my-edit-agent.html","18f5838a10040f70e3f131b318c9690c"],["src/my-edit-user.html","84e5b06bdfa79a235dfb8aa71d6e0392"],["src/my-group.html","df2f8a1d84f4c4a81791bb4a899c56ad"],["src/my-hotel-edit.html","d2a427b5f98bcd4ea00a954cc1abcdd7"],["src/my-hotel-new.html","ddb36304c3b00f6102c4367f5978ee41"],["src/my-hotels.html","ca1071e49fa35562ba97d079fb04faf7"],["src/my-icons.html","54a4b5c2d4ecd27086b6355ff58c8072"],["src/my-inquiry2.html","5dd8db99db2433f911f794429631e7f7"],["src/my-new-agent.html","c3434295710b0a36b732d8e28bf588e0"],["src/my-new-user.html","30db448be17b15eb9577f0bbbc76b6e9"],["src/my-profile.html","b52a94cd40960f66a6a7d1763cd597ae"],["src/my-resetpw.html","1bad19c62eee7ba77386c3408d53d17a"],["src/my-resetpwlink.html","db8c043e26b5521b81ba590f7c65d161"],["src/my-signin.html","0d855597636bff824b6f272b0f29030f"],["src/my-users.html","c01b6bc241a5afdf01c4f423d7e3357a"],["src/my-view1.html","17770dec212823f162e3d0e63e82140a"],["src/my-view2.html","17de4d8af4eaec39151195d60d0dfe24"],["src/my-view3.html","73e3119a717b4447a2829a1ac44ceca2"],["src/my-view404.html","31798c79f50208d7afee9bf55e301c06"],["src/search-bar.html","a14ea0ef5719528e1ecac04972273b50"],["src/shared-styles.html","d7ad01e3d52eb229c4594f25ca9b3a63"],["src/short-unique-id.html","fd47c9c1fdb1515bf04203e8149c7fba"],["src/time-element.html","8ab8a61866f9afd61ff316f03b07e0cc"]];
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

    return bodyPromise.then(function (body) {
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
    return whitelist.some(function (whitelistedPathRegex) {
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
      .map(function (kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function (kv) {
        return ignoreUrlParametersMatching.every(function (ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function (kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function (item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function (requests) {
    return requests.map(function (request) {
      return request.url;
    });
  }).then(function (urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return setOfCachedUrls(cache).then(function (cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function (response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function (responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function () {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function (event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.keys().then(function (existingRequests) {
        return Promise.all(
          existingRequests.map(function (existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function () {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function (event) {
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
        caches.open(cacheName).then(function (cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function (e) {
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
*/!function (e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.toolbox=e()}}(function (){return function e(t,n,r){function o(c,s){if(!n[c]){if(!t[c]){var a="function"==typeof require&&require;if(!s&&a)return a(c,!0);if(i)return i(c,!0);var u=new Error("Cannot find module '"+c+"'");throw u.code="MODULE_NOT_FOUND",u}var f=n[c]={exports:{}};t[c][0].call(f.exports,function (e){var n=t[c][1][e];return o(n?n:e)},f,f.exports,e,t,n,r)}return n[c].exports}for(var i="function"==typeof require&&require,c=0;c<r.length;c++)o(r[c]);return o}({1:[function (e,t,n){"use strict";function r(e,t){t=t||{};var n=t.debug||m.debug;n&&console.log("[sw-toolbox] "+e)}function o(e){var t;return e&&e.cache&&(t=e.cache.name),t=t||m.cache.name,caches.open(t)}function i(e,t){t=t||{};var n=t.successResponses||m.successResponses;return fetch(e.clone()).then(function (r){return"GET"===e.method&&n.test(r.status)&&o(t).then(function (n){n.put(e,r).then(function (){var r=t.cache||m.cache;(r.maxEntries||r.maxAgeSeconds)&&r.name&&c(e,n,r)})}),r.clone()})}function c(e,t,n){var r=s.bind(null,e,t,n);d=d?d.then(r):r()}function s(e,t,n){var o=e.url,i=n.maxAgeSeconds,c=n.maxEntries,s=n.name,a=Date.now();return r("Updating LRU order for "+o+". Max entries is "+c+", max age is "+i),g.getDb(s).then(function (e){return g.setTimestampForUrl(e,o,a)}).then(function (e){return g.expireEntries(e,c,i,a)}).then(function (e){r("Successfully updated IDB.");var n=e.map(function (e){return t.delete(e)});return Promise.all(n).then(function (){r("Done with cache cleanup.")})}).catch(function (e){r(e)})}function a(e,t,n){return r("Renaming cache: ["+e+"] to ["+t+"]",n),caches.delete(t).then(function (){return Promise.all([caches.open(e),caches.open(t)]).then(function (t){var n=t[0],r=t[1];return n.keys().then(function (e){return Promise.all(e.map(function (e){return n.match(e).then(function (t){return r.put(e,t)})}))}).then(function (){return caches.delete(e)})})})}function u(e,t){return o(t).then(function (t){return t.add(e)})}function f(e,t){return o(t).then(function (t){return t.delete(e)})}function h(e){e instanceof Promise||p(e),m.preCacheItems=m.preCacheItems.concat(e)}function p(e){var t=Array.isArray(e);if(t&&e.forEach(function (e){"string"==typeof e||e instanceof Request||(t=!1)}),!t)throw new TypeError("The precache method expects either an array of strings and/or Requests or a Promise that resolves to an array of strings and/or Requests.");return e}function l(e,t,n){if(!e)return!1;if(t){var r=e.headers.get("date");if(r){var o=new Date(r);if(o.getTime()+1e3*t<n)return!1}}return!0}var d,m=e("./options"),g=e("./idb-cache-expiration");t.exports={debug:r,fetchAndCache:i,openCache:o,renameCache:a,cache:u,uncache:f,precache:h,validatePrecacheInput:p,isResponseFresh:l}},{"./idb-cache-expiration":2,"./options":4}],2:[function (e,t,n){"use strict";function r(e){return new Promise(function (t,n){var r=indexedDB.open(u+e,f);r.onupgradeneeded=function (){var e=r.result.createObjectStore(h,{keyPath:p});e.createIndex(l,l,{unique:!1})},r.onsuccess=function (){t(r.result)},r.onerror=function (){n(r.error)}})}function o(e){return e in d||(d[e]=r(e)),d[e]}function i(e,t,n){return new Promise(function (r,o){var i=e.transaction(h,"readwrite"),c=i.objectStore(h);c.put({url:t,timestamp:n}),i.oncomplete=function (){r(e)},i.onabort=function (){o(i.error)}})}function c(e,t,n){return t?new Promise(function (r,o){var i=1e3*t,c=[],s=e.transaction(h,"readwrite"),a=s.objectStore(h),u=a.index(l);u.openCursor().onsuccess=function (e){var t=e.target.result;if(t&&n-i>t.value[l]){var r=t.value[p];c.push(r),a.delete(r),t.continue()}},s.oncomplete=function (){r(c)},s.onabort=o}):Promise.resolve([])}function s(e,t){return t?new Promise(function (n,r){var o=[],i=e.transaction(h,"readwrite"),c=i.objectStore(h),s=c.index(l),a=s.count();s.count().onsuccess=function (){var e=a.result;e>t&&(s.openCursor().onsuccess=function (n){var r=n.target.result;if(r){var i=r.value[p];o.push(i),c.delete(i),e-o.length>t&&r.continue()}})},i.oncomplete=function (){n(o)},i.onabort=r}):Promise.resolve([])}function a(e,t,n,r){return c(e,n,r).then(function (n){return s(e,t).then(function (e){return n.concat(e)})})}var u="sw-toolbox-",f=1,h="store",p="url",l="timestamp",d={};t.exports={getDb:o,setTimestampForUrl:i,expireEntries:a}},{}],3:[function (e,t,n){"use strict";function r(e){var t=a.match(e.request);t?e.respondWith(t(e.request)):a.default&&"GET"===e.request.method&&0===e.request.url.indexOf("http")&&e.respondWith(a.default(e.request))}function o(e){s.debug("activate event fired");var t=u.cache.name+"$$$inactive$$$";e.waitUntil(s.renameCache(t,u.cache.name))}function i(e){return e.reduce(function (e,t){return e.concat(t)},[])}function c(e){var t=u.cache.name+"$$$inactive$$$";s.debug("install event fired"),s.debug("creating cache ["+t+"]"),e.waitUntil(s.openCache({cache:{name:t}}).then(function (e){return Promise.all(u.preCacheItems).then(i).then(s.validatePrecacheInput).then(function (t){return s.debug("preCache list: "+(t.join(", ")||"(none)")),e.addAll(t)})}))}e("serviceworker-cache-polyfill");var s=e("./helpers"),a=e("./router"),u=e("./options");t.exports={fetchListener:r,activateListener:o,installListener:c}},{"./helpers":1,"./options":4,"./router":6,"serviceworker-cache-polyfill":16}],4:[function (e,t,n){"use strict";var r;r=self.registration?self.registration.scope:self.scope||new URL("./",self.location).href,t.exports={cache:{name:"$$$toolbox-cache$$$"+r+"$$$",maxAgeSeconds:null,maxEntries:null},debug:!1,networkTimeoutSeconds:null,preCacheItems:[],successResponses:/^0|([123]\d\d)|(40[14567])|410$/}},{}],5:[function (e,t,n){"use strict";var r=new URL("./",self.location),o=r.pathname,i=e("path-to-regexp"),c=function (e,t,n,r){t instanceof RegExp?this.fullUrlRegExp=t:(0!==t.indexOf("/")&&(t=o+t),this.keys=[],this.regexp=i(t,this.keys)),this.method=e,this.options=r,this.handler=n};c.prototype.makeHandler=function (e){var t;if(this.regexp){var n=this.regexp.exec(e);t={},this.keys.forEach(function (e,r){t[e.name]=n[r+1]})}return function (e){return this.handler(e,t,this.options)}.bind(this)},t.exports=c},{"path-to-regexp":15}],6:[function (e,t,n){"use strict";function r(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}var o=e("./route"),i=e("./helpers"),c=function (e,t){for(var n=e.entries(),r=n.next(),o=[];!r.done;){var i=new RegExp(r.value[0]);i.test(t)&&o.push(r.value[1]),r=n.next()}return o},s=function (){this.routes=new Map,this.routes.set(RegExp,new Map),this.default=null};["get","post","put","delete","head","any"].forEach(function (e){s.prototype[e]=function (t,n,r){return this.add(e,t,n,r)}}),s.prototype.add=function (e,t,n,c){c=c||{};var s;t instanceof RegExp?s=RegExp:(s=c.origin||self.location.origin,s=s instanceof RegExp?s.source:r(s)),e=e.toLowerCase();var a=new o(e,t,n,c);this.routes.has(s)||this.routes.set(s,new Map);var u=this.routes.get(s);u.has(e)||u.set(e,new Map);var f=u.get(e),h=a.regexp||a.fullUrlRegExp;f.has(h.source)&&i.debug('"'+t+'" resolves to same regex as existing route.'),f.set(h.source,a)},s.prototype.matchMethod=function (e,t){var n=new URL(t),r=n.origin,o=n.pathname;return this._match(e,c(this.routes,r),o)||this._match(e,[this.routes.get(RegExp)],t)},s.prototype._match=function (e,t,n){if(0===t.length)return null;for(var r=0;r<t.length;r++){var o=t[r],i=o&&o.get(e.toLowerCase());if(i){var s=c(i,n);if(s.length>0)return s[0].makeHandler(n)}}return null},s.prototype.match=function (e){return this.matchMethod(e.method,e.url)||this.matchMethod("any",e.url)},t.exports=new s},{"./helpers":1,"./route":5}],7:[function (e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache first ["+e.url+"]",n),i.openCache(n).then(function (t){return t.match(e).then(function (t){var r=n.cache||o.cache,c=Date.now();return i.isResponseFresh(t,r.maxAgeSeconds,c)?t:i.fetchAndCache(e,n)})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],8:[function (e,t,n){"use strict";function r(e,t,n){return n=n||{},i.debug("Strategy: cache only ["+e.url+"]",n),i.openCache(n).then(function (t){return t.match(e).then(function (e){var t=n.cache||o.cache,r=Date.now();if(i.isResponseFresh(e,t.maxAgeSeconds,r))return e})})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],9:[function (e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: fastest ["+e.url+"]",n),new Promise(function (r,c){var s=!1,a=[],u=function (e){a.push(e.toString()),s?c(new Error('Both cache and network failed: "'+a.join('", "')+'"')):s=!0},f=function (e){e instanceof Response?r(e):u("No result returned")};o.fetchAndCache(e.clone(),n).then(f,u),i(e,t,n).then(f,u)})}var o=e("../helpers"),i=e("./cacheOnly");t.exports=r},{"../helpers":1,"./cacheOnly":8}],10:[function (e,t,n){t.exports={networkOnly:e("./networkOnly"),networkFirst:e("./networkFirst"),cacheOnly:e("./cacheOnly"),cacheFirst:e("./cacheFirst"),fastest:e("./fastest")}},{"./cacheFirst":7,"./cacheOnly":8,"./fastest":9,"./networkFirst":11,"./networkOnly":12}],11:[function (e,t,n){"use strict";function r(e,t,n){n=n||{};var r=n.successResponses||o.successResponses,c=n.networkTimeoutSeconds||o.networkTimeoutSeconds;return i.debug("Strategy: network first ["+e.url+"]",n),i.openCache(n).then(function (t){var s,a,u=[];if(c){var f=new Promise(function (r){s=setTimeout(function (){t.match(e).then(function (e){var t=n.cache||o.cache,c=Date.now(),s=t.maxAgeSeconds;i.isResponseFresh(e,s,c)&&r(e)})},1e3*c)});u.push(f)}var h=i.fetchAndCache(e,n).then(function (e){if(s&&clearTimeout(s),r.test(e.status))return e;throw i.debug("Response was an HTTP error: "+e.statusText,n),a=e,new Error("Bad response")}).catch(function (r){return i.debug("Network or response error, fallback to cache ["+e.url+"]",n),t.match(e).then(function (e){if(e)return e;if(a)return a;throw r})});return u.push(h),Promise.race(u)})}var o=e("../options"),i=e("../helpers");t.exports=r},{"../helpers":1,"../options":4}],12:[function (e,t,n){"use strict";function r(e,t,n){return o.debug("Strategy: network only ["+e.url+"]",n),fetch(e)}var o=e("../helpers");t.exports=r},{"../helpers":1}],13:[function (e,t,n){"use strict";var r=e("./options"),o=e("./router"),i=e("./helpers"),c=e("./strategies"),s=e("./listeners");i.debug("Service Worker Toolbox is loading"),self.addEventListener("install",s.installListener),self.addEventListener("activate",s.activateListener),self.addEventListener("fetch",s.fetchListener),t.exports={networkOnly:c.networkOnly,networkFirst:c.networkFirst,cacheOnly:c.cacheOnly,cacheFirst:c.cacheFirst,fastest:c.fastest,router:o,options:r,cache:i.cache,uncache:i.uncache,precache:i.precache}},{"./helpers":1,"./listeners":3,"./options":4,"./router":6,"./strategies":10}],14:[function (e,t,n){t.exports=Array.isArray||function (e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],15:[function (e,t,n){function r(e,t){for(var n,r=[],o=0,i=0,c="",s=t&&t.delimiter||"/";null!=(n=x.exec(e));){var f=n[0],h=n[1],p=n.index;if(c+=e.slice(i,p),i=p+f.length,h)c+=h[1];else{var l=e[i],d=n[2],m=n[3],g=n[4],v=n[5],w=n[6],y=n[7];c&&(r.push(c),c="");var b=null!=d&&null!=l&&l!==d,E="+"===w||"*"===w,R="?"===w||"*"===w,k=n[2]||s,$=g||v;r.push({name:m||o++,prefix:d||"",delimiter:k,optional:R,repeat:E,partial:b,asterisk:!!y,pattern:$?u($):y?".*":"[^"+a(k)+"]+?"})}}return i<e.length&&(c+=e.substr(i)),c&&r.push(c),r}function o(e,t){return s(r(e,t))}function i(e){return encodeURI(e).replace(/[\/?#]/g,function (e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function c(e){return encodeURI(e).replace(/[?#]/g,function (e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}function s(e){for(var t=new Array(e.length),n=0;n<e.length;n++)"object"==typeof e[n]&&(t[n]=new RegExp("^(?:"+e[n].pattern+")$"));return function (n,r){for(var o="",s=n||{},a=r||{},u=a.pretty?i:encodeURIComponent,f=0;f<e.length;f++){var h=e[f];if("string"!=typeof h){var p,l=s[h.name];if(null==l){if(h.optional){h.partial&&(o+=h.prefix);continue}throw new TypeError('Expected "'+h.name+'" to be defined')}if(v(l)){if(!h.repeat)throw new TypeError('Expected "'+h.name+'" to not repeat, but received `'+JSON.stringify(l)+"`");if(0===l.length){if(h.optional)continue;throw new TypeError('Expected "'+h.name+'" to not be empty')}for(var d=0;d<l.length;d++){if(p=u(l[d]),!t[f].test(p))throw new TypeError('Expected all "'+h.name+'" to match "'+h.pattern+'", but received `'+JSON.stringify(p)+"`");o+=(0===d?h.prefix:h.delimiter)+p}}else{if(p=h.asterisk?c(l):u(l),!t[f].test(p))throw new TypeError('Expected "'+h.name+'" to match "'+h.pattern+'", but received "'+p+'"');o+=h.prefix+p}}else o+=h}return o}}function a(e){return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function u(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function f(e,t){return e.keys=t,e}function h(e){return e.sensitive?"":"i"}function p(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var r=0;r<n.length;r++)t.push({name:r,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return f(e,t)}function l(e,t,n){for(var r=[],o=0;o<e.length;o++)r.push(g(e[o],t,n).source);var i=new RegExp("(?:"+r.join("|")+")",h(n));return f(i,t)}function d(e,t,n){return m(r(e,n),t,n)}function m(e,t,n){v(t)||(n=t||n,t=[]),n=n||{};for(var r=n.strict,o=n.end!==!1,i="",c=0;c<e.length;c++){var s=e[c];if("string"==typeof s)i+=a(s);else{var u=a(s.prefix),p="(?:"+s.pattern+")";t.push(s),s.repeat&&(p+="(?:"+u+p+")*"),p=s.optional?s.partial?u+"("+p+")?":"(?:"+u+"("+p+"))?":u+"("+p+")",i+=p}}var l=a(n.delimiter||"/"),d=i.slice(-l.length)===l;return r||(i=(d?i.slice(0,-l.length):i)+"(?:"+l+"(?=$))?"),i+=o?"$":r&&d?"":"(?="+l+"|$)",f(new RegExp("^"+i,h(n)),t)}function g(e,t,n){return v(t)||(n=t||n,t=[]),n=n||{},e instanceof RegExp?p(e,t):v(e)?l(e,t,n):d(e,t,n)}var v=e("isarray");t.exports=g,t.exports.parse=r,t.exports.compile=o,t.exports.tokensToFunction=s,t.exports.tokensToRegExp=m;var x=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g")},{isarray:14}],16:[function (e,t,n){!function (){var e=Cache.prototype.addAll,t=navigator.userAgent.match(/(Firefox|Chrome)\/(\d+\.)/);if(t)var n=t[1],r=parseInt(t[2]);e&&(!t||"Firefox"===n&&r>=46||"Chrome"===n&&r>=50)||(Cache.prototype.addAll=function (e){function t(e){this.name="NetworkError",this.code=19,this.message=e}var n=this;return t.prototype=Object.create(Error.prototype),Promise.resolve().then(function (){if(arguments.length<1)throw new TypeError;return e=e.map(function (e){return e instanceof Request?e:String(e)}),Promise.all(e.map(function (e){"string"==typeof e&&(e=new Request(e));var n=new URL(e.url).protocol;if("http:"!==n&&"https:"!==n)throw new t("Invalid scheme");return fetch(e.clone())}))}).then(function (r){if(r.some(function (e){return!e.ok}))throw new t("Incorrect response status");return Promise.all(r.map(function (t,r){return n.put(e[r],t)}))}).then(function (){})},Cache.prototype.add=function (e){return this.addAll([e])})}()},{}]},{},[13])(13)});


// *** End of auto-included sw-toolbox code. ***



// Runtime cache configuration, using the sw-toolbox library.

toolbox.router.get(/\/bower_components\/webcomponentsjs\/.*.js/, toolbox.fastest, {"cache":{"name":"webcomponentsjs-polyfills-cache"}});




