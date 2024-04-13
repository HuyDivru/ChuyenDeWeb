package com.shopbanquanao.JWTConfiguration;

import java.util.Collection;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shopbanquanao.model.User;


public class UserPrincipal implements UserDetails{
		
	private Long id;
	@JsonIgnore
	private String mobile;
	@JsonIgnore
	private String password;
	
	 private Collection<? extends GrantedAuthority> authorities;
	 
	public UserPrincipal(long id, String mobile, String password) {
		this.id=id;
		this.mobile=mobile;
		this.password=password;
	}

	
	//
	public static UserPrincipal create(User user) {
        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getPassword()
              
        );
    }
	
	public Long getId() {
		return id;
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	  @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        UserPrincipal that = (UserPrincipal) o;
	        return Objects.equals(id, that.id);
	    }
	  @Override
	    public int hashCode() {
	        return Objects.hash(id);
	    }

}
