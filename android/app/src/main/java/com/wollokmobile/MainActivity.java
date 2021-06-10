package com.wollokmobile;

import android.content.res.Configuration;
import android.os.Bundle;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  static String currentLocale;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      MainActivity.currentLocale = getResources().getConfiguration().locale.toString();
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
      super.onConfigurationChanged(newConfig);

      String locale = newConfig.locale.toString();
      if (!MainActivity.currentLocale.equals(locale)) {
          MainActivity.currentLocale = locale;
          final ReactInstanceManager instanceManager = getReactInstanceManager();
          instanceManager.recreateReactContextInBackground();
      }
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "wollokMobile";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }
}
