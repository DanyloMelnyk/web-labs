package ua.lviv.mel2.web_labs_back.config;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import ua.lviv.mel2.web_labs_back.model.MyUser;

import java.util.Date;

import static java.lang.String.format;

@Component
public class JwtTokenUtil {
    private final String jwtSecret = "zdtlD3JKsggs56242gsdgsm6wTTgsNFhqzjqP";
    private final String jwtIssuer = "localhost";

    public String generateAccessToken(MyUser user) {
        return Jwts.builder()
                .setSubject(format("%s,%s", user.getId(), user.getUsername()))
                .setIssuer(jwtIssuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)) // 1 week
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJwt(token)
                .getBody();

        return claims.getSubject().split(",")[0];
    }

    public String getUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJwt(token)
                .getBody();

        return claims.getSubject().split(",")[1];
    }

    public Date getExpirationDate(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration();
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT signature - {}" + ex.getMessage());
            //logger.error("Invalid JWT signature - {}", ex.getMessage());
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT signature - {}" + ex.getMessage());
            //logger.error("Invalid JWT token - {}", ex.getMessage());
        } catch (ExpiredJwtException ex) {
            System.out.println("Invalid JWT signature - {}" + ex.getMessage());
            //logger.error("Expired JWT token - {}", ex.getMessage());
        } catch (UnsupportedJwtException ex) {
            System.out.println("Invalid JWT signature - {}" + ex.getMessage());

            //logger.error("Unsupported JWT token - {}", ex.getMessage());
        } catch (IllegalArgumentException ex) {
            System.out.println("Invalid JWT signature - {}" + ex.getMessage());

            //logger.error("JWT claims string is empty - {}", ex.getMessage());
        }
        return false;
    }

}