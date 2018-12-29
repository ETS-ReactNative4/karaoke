package com.karaoke;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.yamill.orientation.OrientationPackage;
import com.inprogress.reactnativeyoutube.ReactNativeYouTube;
import com.oblador.vectoricons.VectorIconsPackage;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import guichaguri.trackplayer.TrackPlayer;
import org.reactnative.camera.RNCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import guichaguri.trackplayer.TrackPlayer;
import org.reactnative.camera.RNCameraPackage;
import guichaguri.trackplayer.TrackPlayer;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List getPackages() {
      return Arrays.asList(
          new MainReactPackage(),
            new OrientationPackage(),
            new ReactNativeYouTube(),
            new VectorIconsPackage(),
            new RNCameraPackage(),
            new VectorIconsPackage(),
            new TrackPlayer(),
            new RNCameraPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new TrackPlayer()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
