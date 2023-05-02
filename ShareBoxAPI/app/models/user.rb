class User < ActiveRecord::Base
  has_many :vouchers
  has_many :payments

  has_secure_password

  def as_json(**options)
    # this coerces the option into an array and merges the passed
    # values with defaults
    excluding = [options[:except]].flatten
                                  .compact
                                  .union([:password_digest])
    super(options.merge(except: excluding))
  end
end
