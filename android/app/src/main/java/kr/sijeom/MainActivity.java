package kr.sijeom;

import android.os.Bundle;
import android.view.View;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        
        View decorView = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(decorView, (v, insets) -> {
            int topInset = insets.getInsets(WindowInsetsCompat.Type.systemBars()).top;
            int bottomInset = insets.getInsets(WindowInsetsCompat.Type.systemBars()).bottom;
            int leftInset = insets.getInsets(WindowInsetsCompat.Type.systemBars()).left;
            int rightInset = insets.getInsets(WindowInsetsCompat.Type.systemBars()).right;
            
            View webView = findViewById(android.R.id.content);
            if (webView != null) {
                webView.setPadding(leftInset, topInset, rightInset, bottomInset);
            }
            
            return WindowInsetsCompat.CONSUMED;
        });
    }
}
